
import type { PageServerLoad } from './$types';
import { appendToData } from '@/lib/utils/page'
import truncate from "truncate-html";
// import { getSchemaContent } from '@/lib/utils/server/schema'
// import type { ICurrentUser } from '$lib/types/user'
import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@/lib/utils/page'
import { config } from '$lib/config'

export const load: PageServerLoad = async (req) => {
    const slug  = req.params.slug

    if(!slug) {
        throw error(404, 'Not found')
    }
    const user = (await supabase.from('fsk_blog_author')
        .select('*')
        .eq('username', slug).single()).data
        if(!user) {
            throw error(404, 'Not found')
        }
    
    const fallBackDescription =  truncate(user.description, 160, {
      stripTags: true
    }) || 'Desciption is missing | ' + config.siteName 
    return appendToData(
      {res: user}, 
      {pageTitle: 'Author | ' + user.username ?? 'Author | ' + config.siteName, 
      pageDescription: fallBackDescription    
    })
  }
