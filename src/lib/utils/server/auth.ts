import type { ICookies } from '$lib/types/cookies'
import { supabase } from '@/lib/node/supaClientFS'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkAuth = async (req: ICookies) => {
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
    return {
        username,
        hash
    }
}
