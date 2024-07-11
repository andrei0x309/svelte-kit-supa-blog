// import { error } from '@sveltejs/kit';
// import { supabase } from '@/lib/deno/supaClientEdge'
import { supabase } from '@/lib/node/supaClientFS'
import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
 
export const GET: RequestHandler = async ({ url }) => {
  let page =  Number(url.searchParams.get('page') ?? 1);
  if (page < 1) {
    page = 1;
  }

  try {
    const countDb = supabase
    .from('fsk_prj')
    .select('*', { count: 'exact', head: true });
  
    const resDb = supabase.from('fsk_prj').select(`
    *,
    cat:fsk_prj_cat(
        cat_name
    ),
    techs:fsk_prj_tech_type!inner(
        id,
        name
    )
    `).range((page-1)*4, (page*4)-1);
  
    const [count, res] = await Promise.all([countDb, resDb])
      
    ;(res as unknown as {page: number}).page = page
    ;(res as unknown as {totalPages: number}).totalPages = (count?.count ?? 0) / 4
  
    if(page > (res as unknown as {totalPages: number}).totalPages) {
      return json({error: 'Not found'}, {status: 404})
    }
    
    return json(res);

    } catch (e) {
      console.log(e)
      return json({error: 'Internal Server Error'}, {status: 500})
    }
  
  
}
