import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit'
import { checkAuth } from '@/lib/utils/server/auth'
import type { LayoutServerLoad } from './$types';
import type { ICookies } from '$lib/types/cookies'
 
export const load = (async (req) => {
    try {
    const { username } =await checkAuth(req as ICookies)
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', username).single()
    return {
        currentUser: currentUser.data
    }
    } catch (e) {
        if(e === 'denied') {
            error(403,  {
                            message: 'Forbidden',
                            pageType: 'error'
                        } as App.Error);
        }
    }
    
    
}) satisfies LayoutServerLoad;