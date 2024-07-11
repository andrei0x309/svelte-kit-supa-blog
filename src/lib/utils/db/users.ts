import { supabase } from '@/lib/node/supaClientFS'

export const loadUsers = async (page: number, perPege = 4) => {
    try {
  const res = await supabase.from('fsk_blog_author').select('*')
    .order('created_at', { ascending: false })
    .range((page-1)*(perPege+1), (page*(perPege+1))-1)
      

      const hasNext = res.data?.length === (perPege+1)
      res.data = res.data?.slice(0, perPege) ?? []

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
