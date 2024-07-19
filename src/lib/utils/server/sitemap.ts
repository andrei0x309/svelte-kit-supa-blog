import { supabase } from "@/lib/node/supaClientFS";
import { config } from  "@/lib/config";

const CAT_PATH = 'category'
const TAG_PATH = 'tag'
const AUTHOR_PATH = 'author'

export const generatePaths = async () => {

    const paths = []

    type SelectData = {
        slug?: string
        username?: string
    }

    // Front
    paths.push({
        url: '',
        priority: 1,
        changefreq: 'daily',
    })

    // Posts
    let { data } = await supabase.from('fsk_blog_posts').select('slug') as { data: SelectData[] | null }
    // categories 
    for (const post of data ?? []) {
        paths.push({
            url: `${post?.slug}`,
            priority: 0.8,
            changefreq: 'monthly',
        })
    }

    // Categories
    ;({ data } = await supabase.from('fsk_blog_cat').select('slug'))
    
    for (const cat of data ?? []) {
        paths.push({
            url: `${CAT_PATH}/${cat?.slug}`,
            priority: 0.8,
            changefreq: 'monthly',
        })
    }

    if(config.authorPageEnabled) {
        // Authors
        ;({ data } = await supabase.from('fsk_blog_author').select('username'))
        for (const author of data ?? []) {
            paths.push({
                url: `${AUTHOR_PATH}/${author?.username}`,
                priority: 0.8,
                changefreq: 'monthly',
            })
        }
    }

    // Tags
    ;({ data } = await supabase.from('fsk_blog_tag').select('slug'))

    for (const tag of data ?? []) {
        paths.push({
            url: `${TAG_PATH}/${tag.slug}`,
            priority: 0.6,
            changefreq: 'monthly',
        })
    }

   
    return paths
}