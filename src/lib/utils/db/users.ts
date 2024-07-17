import { supabase } from '@/lib/node/supaClientFS'

export const loadUsers = async (page: number, perPege = 4) => {
    try {
    
  const res = await supabase.from('fsk_blog_author').select('*')
    .order('created_at', { ascending: false })
    .range((page-1)*(perPege), (page*(perPege)))

      const hasNext = res.data?.length === (perPege+1)
      console.log(res.data?.length)
      res.data = res.data?.slice(0, perPege) ?? []

      ;(res as unknown as {page: number}).page = page
      ;(res as unknown as {hasNext: boolean}).hasNext = hasNext
      
      return {
          res
        }; 
      } catch (e) {
       return null
      }
}
