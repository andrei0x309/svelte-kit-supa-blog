import type { ICurrentUser } from '$lib/types/user';
import { supabase } from '@/lib/node/supaClientFS'
import { checkAuth } from '@/lib/utils/server/auth'
import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { getSha256 } from '@/lib/utils/server/crypto'

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const { username:cuser } = await checkAuth(req)
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', cuser).single()
    const { username, email, avatar, id, role, password } = await request.json()
    if(currentUser.data.role !== 'admin') {
        return json({
            error: 'Only admin can edit or create users'
        }, {status: 403})
    }
    const update = {} as ICurrentUser
    if(username) update.username = username
    if(email) update.email = email
    if(avatar) update.avatar = avatar
    if(role) update.role = role
    if(password) update.password_hash = await getSha256(password)
    if(role){
        if(!['admin', 'contribuitor'].includes(role)) {
            return json({
                error: 'Invalid role!'
            }, {status: 400})
        }
        update.role = role
    }
    if(id) {
        update.id = id
        await supabase.from('fsk_blog_author').upsert(update)
    } else {
        await supabase.from('fsk_blog_author').insert(update)
    }

    return json({
        success: true
    }, {status: 200})

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
