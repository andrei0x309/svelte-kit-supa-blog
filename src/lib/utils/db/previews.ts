import { supabase } from '@/lib/node/supaClientFS'
import { loadTags, preparePostResponse } from '@/lib/utils/db/posts'

export const loadLast20Drafts = async () => {
    try {
      const tagsDB = loadTags()
      const resDb = supabase.from('fsk_blog_posts').select(`
      *,
      cat:fsk_blog_cat(
          id,
          name,
          description,
          slug
      ),    author:fsk_blog_author(
        id,
        name,
        username,
       avatar
       ) 
      `.toString())
      .eq('draft', true)
        .order('created_at', { ascending: false })
        .range(0, 20)
      const [tags, res] = await Promise.all([tagsDB, resDb])
  
      return preparePostResponse({
        tags,
        res
      })
  
    } catch (e) {
      return null
    }
  }
  