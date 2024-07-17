import { supabase } from '@/lib/node/supaClientFS'
import { checkAuth } from '@/lib/utils/server/auth'
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { loadCatOrTag } from '$lib/utils/db/catOrTag';
import type { RequestHandler } from './$types';
import { rem_tag_from_posts } from '$lib/utils/db/posts';

export const DELETE: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const { username:cuser } = await checkAuth(req)
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', cuser).single()
    const { id, type } = await request.json()
     if(!id || !type) {
        return json({
            error: 'No id and type provided'
        }, {status: 400})
    }
    if(currentUser.data.role !== 'admin') {
        return json({
            error: 'Only admin can delete categories'
        }, {status: 403})
    }

    const exists = await loadCatOrTag(id, type)
    if(exists?.notFound) {
        return json({
            error: 'Resource does not exist'
        }, {status: 400})
    }
    const table = type === 'cat' ? 'fsk_blog_cat' : 'fsk_blog_tag'
    if (type === 'cat') {
        await supabase.from('fsk_blog_posts').update({ cat_id: null }).eq('cat_id', id)
    } else {
        await rem_tag_from_posts(id)
    }

    const deleteRes = await supabase.from(table).delete().eq('id', id)

    if (deleteRes?.error) {
        return json({
            error: deleteRes?.error?.message || 'Internal Server Error'
        }, {status: 500})
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
