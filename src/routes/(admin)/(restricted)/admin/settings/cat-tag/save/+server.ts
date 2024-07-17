import type { ICatTag } from '$lib/types/catTag';
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
    const { name, slug, description, id, type } = await request.json()
    if(currentUser.data.role !== 'admin') {
        return json({
            error: 'Only admin can edit or create categories'
        }, {status: 403})
    }

    if(!name || !slug  || !type) return json({
        error: 'Missing required fields, name, slug, type'
    }, {status: 400})

    if(type !== 'cat' && type !== 'tag') return json({
        error: 'Invalid type'
    }, {status: 400})

    const update = {} as ICatTag
    if(name) update.name = name
    if(slug) update.slug = slug
    if(description) update.description = description
    if(id) update.id = id
    let updateId = id
    if(id) {
        update.id = id
        update.updated_at = new Date().toISOString()
        if(type === 'cat') {
            await supabase.from('fsk_blog_cat').upsert(update)
        } else if(type === 'tag') {
            await supabase.from('fsk_blog_tag').upsert(update)
        }
    } else {
        let updateResult
        update.created_at = new Date().toISOString()
        if(type === 'cat') {
            updateResult = await supabase.from('fsk_blog_cat').insert(update).select()
        } else if(type === 'tag') {
            updateResult =  await supabase.from('fsk_blog_tag').insert(update).select()
        }
        updateId = updateResult?.data?.[0]?.id
        if(updateResult?.error) return json({
            error: updateResult.error.message
        }, {status: 500})
    }

    return json({
        success: true,
        updateId
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
