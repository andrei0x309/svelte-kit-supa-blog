import type { ICookies } from '$lib/types/cookies'
import { supabase } from '@/lib/node/supaClientFS'


export const checkAuth = async (req: ICookies) => {
    const username = req.cookies.get('username')
    const hash = req.cookies.get('hash')
    if(!username || !hash) {
        throw 'denied'
    }
    const user = (await supabase.from('fsk_blog_author')
    .select('*')
    .eq('username', username).single()).data
    if(!user) {
        throw 'denied'
    }
    if(hash !== user.password_hash) {
        throw 'denied'
    }
    return user as {
        id: number
        username: string
        email: string
        avatar: string
        name: string
        description: string
        social_links: string
        password_hash: string
        role: string
        created_at: string
    }
}
