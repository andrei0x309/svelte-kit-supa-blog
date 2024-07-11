import { supabase } from '@/lib/node/supaClientFS'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (req) => {
    try {
    const username = req.cookies.get('username')
    const currentUserP = supabase.from('fsk_blog_author').select('*').eq('username', username).single()
    const 
    
}
