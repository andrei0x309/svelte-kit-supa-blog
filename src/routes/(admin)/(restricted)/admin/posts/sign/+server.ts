import { supabase } from '@/lib/node/supaClientFS'
import { checkAuth } from '@/lib/utils/server/auth'
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { loadPost } from '$lib/utils/db/posts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const { username:cuser } = await checkAuth(req)
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', cuser).single()
    const { slug, signature } = await request.json()
     if(!slug) {
        return json({
            error: 'No slug provided'
        }, {status: 400})
    }
    const exists = await loadPost(slug, true)
    if(!exists?.res?.slug) {
        return json({
            error: 'Post does not exist'
        }, {status: 400})
    }
    if(exists.res.author_id !== currentUser.data.id &&  currentUser.data.role !== 'admin') {
        return json({
            error: 'Only admin sign other users posts'
        }, {status: 403})
    }
    if(!signature) {
        return json({
            error: 'No signature provided'
        }, {status: 400})
    }
    if(!signature?.address || !signature?.signature || !signature?.data) {
        return json({
            error: 'Invalid signature'
        }, {status: 400})
    }
    
    await supabase.from('fsk_blog_posts').update({
        signature: JSON.stringify(signature)
    }).eq('slug', slug)

    return json({
        success: true
    }, {status: 200})
    } catch (e) {
        console.log(e)
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
