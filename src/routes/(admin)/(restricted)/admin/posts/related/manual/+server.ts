import { checkAuth } from '@/lib/utils/server/auth'
import { json } from '@sveltejs/kit';
import type { ICookies } from '$lib/types/cookies';
import { loadRelatedPosts } from '$lib/utils/db/posts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
    try {
    const req = { cookies } as ICookies
    await checkAuth(req)
    const {slugs, slug} = await request.json()
    
    if(!slugs) {
        return json({
            error: 'No slugs provided'
        }, {status: 400})
    }

    if(!Array.isArray(slugs)) {
        return json({
            error: 'Slugs is not an array'
        }, {status: 400})
    }
    
    if(slugs.length === 0) {
        return json({
            error: 'Slugs is empty'
        }, {status: 400})
    }
    const relatedPosts = await loadRelatedPosts({
        tag_ids: slugs,
        slugs: true,
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
