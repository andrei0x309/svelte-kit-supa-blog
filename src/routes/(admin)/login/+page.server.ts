import { supabase } from '@/lib/node/supaClientFS'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (req) => {
    try {
    const username = req.cookies.get('username')
    const hash = req.cookies.get('hash')

    if(username && hash){
        const user = (await supabase.from('fsk_blog_author')
        .select('username, password_hash')
        .eq('username', username).single()).data
        if(user) {
            if(hash === user.password_hash) {
                throw 'redirect'
            }
        }
    }
        return {}
    } catch (e) {
        if(e === 'redirect') {
            throw redirect(302, '/admin')
        }
        return {}
    }
}
