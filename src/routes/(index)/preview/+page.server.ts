import { loadLast20Drafts } from '$lib/utils/db/previews'
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import { error } from '@/lib/utils/page'
import { supabase } from '@/lib/node/supaClientFS'

const defaultError = {
    message: 'Unauthorized',
    pageType: 'author'
    } as App.Error

export const load: PageServerLoad = async (req) => {
    const username = req.cookies.get('username')
    const hash = req.cookies.get('hash')

    if(username && hash){
        const user = (await supabase.from('fsk_blog_author')
        .select('username, password_hash')
        .eq('username', username).single()).data
        if(user) {
            if(hash !== user.password_hash) {
                throw error(401, defaultError)
            }
        }
    }

    const dataPosts = await loadLast20Drafts()

    return appendToData(checkData(dataPosts), 
    {pageTitle: 'Preview Draft Posts ', 
    pageDescription: 'Preview Draft Posts Auth Needed',
    })
  }
