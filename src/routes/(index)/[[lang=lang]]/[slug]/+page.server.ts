
import type { PageServerLoad } from './$types';

import { supabase } from '@/lib/node/supaClientFS'
import { optionalChain } from '@/lib/utils/index'
import { checkData, extractPage, error, appendToData, makeTitle } from '@/lib/utils/page'
import truncate from "truncate-html";


const loadPost = async (slug: string) => {
try {

const tagsDB = supabase.from('fsk_blog_tag').select('*')

  
const resDb = supabase.from('fsk_blog_posts').select(`
  *,
  cat:fsk_blog_cat(
      id,
      name,
      description
  ),
  author:fsk_blog_author(
    id,
    name,
    username
   ) 
  `)
  .eq(
    'slug', slug
  )
    
    const [tags, res] = await Promise.all([tagsDB, resDb])
    const tagsMap = tags.data?.reduce((acc: {[key: number]: Record<string, unknown>}, tag: { id: number } ) => {
      acc[tag.id] = tag
      return acc
    }, {})
    
    if(res.data) {
    res.data = res.data?.map((r: { tags_id: number[], tags: Record<string, unknown>[], isFull: boolean }) => {  
      r.tags = r.tags_id.map((id: number) => tagsMap[id])
      r.isFull = true
      return r
    })
    }

    // ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 9)
  
    // if(page > (res as unknown as {totalPages: number}).totalPages) {
    //   return -1
    // }
    
    return {
        res: res.data?.[0]
      }; 
    } catch (e) {
     console.log(e)
     return null
    }
  }


export const load: PageServerLoad = async (data) => {
    let slug
    if(data.params?.lang) {
      slug = data.params.lang + '/' + data.params.slug
    } else {
      slug = data.params.slug
    } 
    const post = await loadPost(slug) as {res: Record<string, any>}
    const fallBackDescription = post?.res?.seo_description || truncate(post?.res?.content, 250, {
      stripTags: true
    }) || 'Desciption is missing | blog.flashsoft.eu'
    return appendToData(checkData(post), {pageTitle: post?.res?.title ?? 'Blog | flashsoft.eu', pageDescription: post?.res?.seo_description || fallBackDescription})
  }
