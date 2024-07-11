import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit'

import type { LayoutServerLoad } from './$types';
 
export const load = (async (req) => {
    try {
    const username = req.cookies.get('username')
    const hash = req.cookies.get('hash')
    if(!username || !hash) {
        throw 'denied'
    }
    const user = (await supabase.from('fsk_blog_author')
    .select('username, password_hash')
    .eq('username', username).single()).data
    if(!user) {
        throw 'denied'
    }
    if(hash !== user.password_hash) {
        throw 'denied'
    }
    } catch (e) {
        if(e === 'denied') {
            throw error(403, 'Access denied')
        }
    }
    
    
}) satisfies LayoutServerLoad;