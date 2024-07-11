import { supabase } from '@/lib/node/supaClientFS'
// import { optionalChain } from '@/lib/utils/index'
// import { checkData, extractPage, error, appendToData, makeTitle } from '@/lib/utils/page'
import truncate from "truncate-html";



export const loadPosts = async (page: number, perPege = 4) => {
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
    .order('created_at', { ascending: false })
    .range((page-1)*(perPege+1), (page*(perPege+1))-1)
      
      const [tags, res] = await Promise.all([tagsDB, resDb])
      const tagsMap = tags.data?.reduce((acc: {[key: number]: Record<string, unknown>}, tag: { id: number } ) => {
        acc[tag.id] = tag
        return acc
      }, {})
      const hasNext = res.data?.length === (perPege+1)
      res.data = res.data?.slice(0, perPege) ?? []

      res.data = res.data?.map((r: { 
        tags_id: number[], 
        tags: Record<string, unknown>[], 
        isFull: boolean,
        content: string
      }) => {  
        r.tags = r.tags_id.map((id: number) => tagsMap[id])
        r.isFull = false
        r.content = truncate(r.content, 500)
        return r
      })

      ;(res as unknown as {page: number}).page = page
      ;(res as unknown as {hasNext: boolean}).hasNext = hasNext
      
      return {
          res
        }; 
      } catch (e) {
       console.log(e)
       return null
      }
    }
