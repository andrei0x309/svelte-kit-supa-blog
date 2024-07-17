import { supabase } from '@/lib/node/supaClientFS'
import { checkAuth } from '@/lib/utils/server/auth'
import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const { username:cuser } = await checkAuth(req)
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', cuser).single()
    const { id } = await request.json()
    if(currentUser.data.role !== 'admin') {
        return json({
            error: 'Only admin can delete users'
        }, {status: 403})
    }
    if (currentUser.data.id === id) {
        return json({
            error: 'You cannot delete yourself'
        }, {status: 403})
    }
    if(id) {
        await supabase.from('fsk_blog_author').delete().eq('id', id)
        return json({
            success: true
        }, {status: 200})
    } 
    return json({
        error: 'No id provided'
    }, {status: 400})

    } catch (e) {
        if(e === 'denied') {
            return json({
                error: 'Access denied'
            }, {status: 403})
        }
        return json({
            error: 'Internal Server Error'
        }, {status: 500})
    }
    
}) satisfies RequestHandler;
