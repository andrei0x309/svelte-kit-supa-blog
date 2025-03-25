import { supabase } from '@/lib/node/supaClientFS'
import { checkAuth } from '@/lib/utils/server/auth'
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { loadPost } from '$lib/utils/db/posts';
import type { RequestHandler } from './$types';
import { dec_tags_count } from '$lib/utils/db/posts';

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const currentUser = await checkAuth(req)

    if(currentUser.role === 'demo') {
        return json({
            error: 'Demo User can\'t take this action'
        }, {status: 403})
    }

     const { slug } = await request.json()
     if(!slug) {
        return json({
            error: 'No slug provided'
        }, {status: 400})
    }
    const exists = await loadPost(slug)
    if(!exists?.res?.slug) {
        return json({
            error: 'Post does not exist'
        }, {status: 400})
    }
    if(exists.res.author_id !== currentUser.id &&  currentUser.role !== 'admin') {
        return json({
            error: 'Only admin delete other users posts'
        }, {status: 403})
    }
    await supabase.from('fsk_blog_posts').delete().eq('slug', slug)
    if(exists.res.tags_id) {
        await dec_tags_count(exists.res.tags_id)
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
