import type { ServerLoadEvent } from '@sveltejs/kit/types/index'
import { supabase } from '@/lib/node/supaClientFS'


export const checkAuth = async (req: ServerLoadEvent<object, object, '' | null>) => {
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
