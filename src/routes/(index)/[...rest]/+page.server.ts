import type { PageServerLoad } from './$types';
// import { supabase } from '@/lib/deno/supaClientEdge'
// import { supabase } from '@/lib/node/supaClientFS'
// import { optionalChain } from '@/lib/utils/index'
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page'
import { loadPosts } from '@/lib/utils/db/posts'

// type SupaClient = typeof supabase
// type PostgesQueryBuilder = ReturnType<SupaClient['from']>
// type PostgesQueryBuilderSelect = ReturnType<PostgesQueryBuilder['select']>

// const loadFilteredCerts = async (page = 1, tag_ids: number[]) => {
//   try {
//     const countDb = supabase.from('fsk_cert').select(`tags:fsk_cert_tag_type!inner(
//       id
//   )`,  { count: 'exact', head: true })
//     .in('fsk_cert_tag_type.id', tag_ids)

//     const resDb = supabase.from('fsk_cert').select(`
//     id,
//     tags:fsk_cert_tag_type!inner(
//         id,
//         name
//     )
//     `)
//     .in('fsk_cert_tag_type.id', tag_ids)
//     .range((page-1)*9, (page*9)-1);
//     // eslint-disable-next-line prefer-const
//     let [count, res] = await Promise.all([countDb, resDb])
//     const ids = res.data?.map((r: { id: number; }) => r.id)
//     if (!ids) {
//       return -1
//     }

//     res = await supabase.from('fsk_cert').select(`
//     id,
//     cert_name,
//     cert_description,
//     cert_file_name,
//     cert_feature_image,
//     cat:fsk_cert_cat(
//         cat_name,
//         cat_icon_name
//     ),
//     tags:fsk_cert_tag_type!inner(
//         id,
//         name
//     )
//     `)
//     .in('id', ids)
          
//     ;(res as unknown as {page: number}).page = page
//     ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 9)
//     ;(res as unknown as {tag_ids: number[]}).tag_ids = tag_ids
  
//     if(page > (res as unknown as {totalPages: number}).totalPages) {
//       return -1
//     }
    
    
//     return {
//         res
//       }; 
//     } catch (e) {
//      return null
//     }
//   }

// const loadCerts = async (page: number, search = false, searchTerms: string[] = []) => {
//   try {
//     const countDb = optionalChain(supabase
//     .from('fsk_cert')
//     .select('*', { count: 'exact', head: true }))
//     .if(search, 
//       (chain: PostgesQueryBuilderSelect) => 
//       chain.or(searchTerms.map( t => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(','))).end()

  
//     const resDb = optionalChain(supabase.from('fsk_cert').select(`
//   id,
//   cert_name,
//   cert_file_name,
//   cert_description,
//   cert_feature_image,
//   cat:fsk_cert_cat(
//       cat_name,
//       cat_icon_name
//   ),
//   tags:fsk_cert_tag_type!inner(
//       id,
//       name
//   )
//   `)).if(search, 
//   (chain: PostgesQueryBuilderSelect) => 
  
  
//   chain.or(searchTerms.map( t => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(',')))
//   .end()
//   .range((page-1)*9, (page*9)-1);
  
//     const [count, res] = await Promise.all([countDb, resDb])
      
//     ;(res as unknown as {page: number}).page = page
//     ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 9)
  
//     if(page > (res as unknown as {totalPages: number}).totalPages) {
//       return -1
//     }
    
//     return {
//         res
//       }; 
//     } catch (e) {
//      return null
//     }
//   }

//   const loadCert = async (id: number, title: string) => {
//     try {
//       const res = await supabase.from('fsk_cert').select(`
//       id,
//       cert_name,
//       cert_file_name,
//       cert_description,
//       cert_feature_image,
//       cat:fsk_cert_cat(
//           cat_name,
//           cat_icon_name
//       ),
//       tags:fsk_cert_tag_type!inner(
//           id,
//           name
//       )
//       `).eq('id', id)
//       const { data, error } = res
//       if (error) {
//         return null
//       }
//       if (data?.length === 0) {
//         return -1
//       }
//       const cert = data[0]
//       if(makeTitle(cert?.cert_name) !== title) {
//         return -1
//       }
//       return {
//         res: cert
//       }
//     } catch (e) {
//       return null
//     }
//   }


export const load: PageServerLoad = async (rest) => {
  const restPath = '/certs/' + (rest.params.rest ?? '/')
  if(!rest.params.rest) {
    const data = await loadPosts(1)
    console.log(data)
    return appendToData(checkData(data), {rest: restPath, pageTitle: 'Courses and Certs | flashsoft.eu', pageDescription: 'Courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'})
  } else {
    const params = rest.params.rest.split('/')
    console.log(params)
    switch(params[0]){
      case 'page': {
      const page = extractPage(rest.params.rest)

      const data = await loadPosts(page)
      return appendToData(checkData(data), {rest: restPath, pageTitle: `Courses and Certs | flashsoft.eu | Page ${page}`, pageDescription: 'Courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'})
    }
    // case 'filter': {
    //   const page = extractPage(rest.params.rest)

    //   const tag_ids = rest.params.rest.split('/tags/')[1].split('/').map((t) => Number(t)).filter((t) => !isNaN(t))
    //   const data =  await loadFilteredCerts(page, tag_ids)
    //   return appendToData(checkData(data), {rest: restPath, pageTitle: `Courses and Certs | flashsoft.eu | Filter tag: ${[tag_ids[0], tag_ids[1], tag_ids[2]].filter(e => !!e).join(' ') }`, pageDescription: 'Filter for courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'})
    // }
    // case 'view': {
    //   console.log(params[1], params[2])
    //   const id = Number(params[1])
    //   if(isNaN(id)) {
    //     throw error(404, 'Not found')
    //   }
    //   const title = params[2]
    //   if(!title) {
    //     throw error(404, 'Not found')
    //   }
      
    //   const data = await loadCert(id, title) as {res: Record<string, unknown>}
    //   return appendToData(checkData(data), {rest: restPath, pageTitle: data?.res?.cert_name ?? 'Courses and Certs | flashsoft.eu', pageDescription: data?.res?.cert_description || `Course details ${data?.res?.cert_name ? 'for ' + data?.res?.cert_name : ''}`})
    //   }
    //   case 'search': {
    //   const page = extractPage(rest.params.rest)
    //   const searchTerms =  rest.url.searchParams.getAll('q')
    //   console.log(searchTerms)
    //   return appendToData(checkData(await loadCerts(page, true, searchTerms)), {
    //     rest: restPath,
    //     searchInput: searchTerms.join(' '),
    //     pageTitle: 'Searching cert for ' + searchTerms.join(' ').substring(0, 20) + '...',
    //     pageDescription: 'Searching cert for ' + searchTerms.join(' ').substring(0, 170) + '...'
    //   })
    // }
    default: {
      throw error(404, 'Not found')
    }
  }
 }
}
