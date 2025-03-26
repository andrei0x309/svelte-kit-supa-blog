import { checkAuth } from '@/lib/utils/server/auth'
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { loadRelatedPosts } from '$lib/utils/db/posts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    const currentUser = await checkAuth(req)
    const {tags_id, slug} = await request.json()
    
    if(currentUser.role === 'demo') {
        return json({
            error: 'Demo User can\'t take this action'
        }, {status: 403})
    }

    if(!tags_id) {
        return json({
            error: 'No tags_ids provided'
        }, {status: 400})
    }

    if(!Array.isArray(tags_id)) {
        return json({
            error: 'tags_ids is not an array'
        }, {status: 400})
    }
    
    if(tags_id.length === 0) {
        return json({
            error: 'tags_ids is empty'
        }, {status: 400})
    }
    const relatedPosts = await loadRelatedPosts({
        tags_id,
        slug
    } as any)
    return json({
        relatedPosts
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
