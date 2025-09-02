import { supabase } from "@/lib/node/supaClientFS";
import { config } from  "@/lib/config";
import { getDiffFromNow } from "@/lib/utils/common/misc";

const CAT_PATH = 'category'
const TAG_PATH = 'tag'
const AUTHOR_PATH = 'author'

type SitemapPath = {
    url: string
    priority: number
    changefreq: string
}

type SitemapCache = {
    name: string
    value_json: SitemapPath[]
    updated_at: string
}


const checkCache = async () => {
    const sitemapCache = await supabase.from('fsk_blog_store').select('*').eq('name', 'sitemap').single() as { data: SitemapCache | null }
    const { data } = sitemapCache
    const generateSitemapCondition = !data || !data.value_json || !data.updated_at || getDiffFromNow(data.updated_at, 'days') > 6
    // check sitemap
   if(!generateSitemapCondition) {
        console.info('Sitemap cache is up to date, using cached version')
        return data.value_json
    }
    console.info('Sitemap cache is empty or outdated, generating new sitemap')
}

export const generatePosts = async () => {
    type SelectData = {
        slug?: string
        username?: string
    }
    const paths = []
    const { data } = await supabase.from('fsk_blog_posts').select('slug').eq('draft', false).order('created_at', { ascending: false }) as { data: SelectData[] | null }

    for (const post of data ?? []) {
        paths.push({
            url: `${post?.slug}`,
            priority: 0.9,
            changefreq: 'monthly',
        })
    }
    return paths
}

export const generateCategories = async () => {
    const paths = []
    const { data } = await supabase.from('fsk_blog_cat').select('slug').order('created_at', { ascending: false }) as { data: { slug: string }[] | null }
    
    for (const cat of data ?? []) {
        paths.push({
            url: `${CAT_PATH}/${cat?.slug}`,
            priority: 0.7,
            changefreq: 'monthly',
        })
    }
    return paths
}

export const generateAuthors = async () => {
    const paths = []

    const { data } = await supabase.from('fsk_blog_author').select('username').order('created_at', { ascending: false }) as { data: { username: string }[] | null }
            for (const author of data ?? []) {
                paths.push({
                    url: `${AUTHOR_PATH}/${author?.username}`,
                    priority: 0.8,
                    changefreq: 'monthly',
                })
            }
    return paths
}

export const generateTags = async () => {
    const paths = []
    const { data } = await supabase.from('fsk_blog_tag').select('slug').order('created_at', { ascending: false }) as { data: { slug: string }[] | null }

    for (const tag of data ?? []) {
        paths.push({
            url: `${TAG_PATH}/${tag.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
        })
    }
    return paths
}

export const generatePaths = async () => {

    const paths = [] as SitemapPath[]

    const sitemapCache = await checkCache()
    if(sitemapCache) {
        return sitemapCache
    }
 
    // Front
    paths.push({
        url: '',
        priority: 1.0,
        changefreq: 'daily',
    })

 
    // Posts
    const posts = await generatePosts();
    paths.push(...posts)

    if(config.authorPageEnabled) {
        // Authors
        const authors = await generateAuthors()
        paths.push(...authors)
    }

    // Categories
    const categories = await generateCategories()
    paths.push(...categories)

    // Tags
    const tags = await generateTags()
    paths.push(...tags)
    // Sitemap cache
    setTimeout(async () => {
        supabase.from('fsk_blog_store').upsert({
            name: 'sitemap',
            value_json: paths,
            updated_at: new Date().toISOString()
        })
    }, 100)
    return paths
}