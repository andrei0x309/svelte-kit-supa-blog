import { supabase } from '#/lib/node/supaClientFS.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import { loadCatOrTag } from '#lib/utils/db/catOrTag.ts';
import { rem_tag_from_posts } from '#lib/utils/db/posts.ts';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = (async ({ request, cookies }) => {
  try {
    const req = { cookies } as ICookies;
    const currentUser = await checkAuth(req);
    if (currentUser.role === 'demo') {
      return Response.json(
        {
          error: "Demo User can't take this action"
        },
        { status: 403 }
      );
    }
    const { id, type } = await request.json();
    if (!id || !type) {
      return Response.json(
        {
          error: 'No id and type provided'
        },
        { status: 400 }
      );
    }
    if (currentUser.role !== 'admin') {
      return Response.json(
        {
          error: 'Only admin can delete categories'
        },
        { status: 403 }
      );
    }

    const exists = await loadCatOrTag(id, type);
    if (exists?.notFound) {
      return Response.json(
        {
          error: 'Resource does not exist'
        },
        { status: 400 }
      );
    }
    const table = type === 'cat' ? 'fsk_blog_cat' : 'fsk_blog_tag';
    if (type === 'cat') {
      await supabase.from('fsk_blog_posts').update({ cat_id: null }).eq('cat_id', id);
    } else {
      await rem_tag_from_posts(id);
    }

    const deleteRes = await supabase.from(table).delete().eq('id', id);

    if (deleteRes?.error) {
      return Response.json(
        {
          error: deleteRes?.error?.message || 'Internal Server Error'
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true
      },
      { status: 200 }
    );
  } catch (e) {
    if (e === 'denied') {
      return Response.json(
        {
          error: 'Access denied'
        },
        { status: 403 }
      );
    }
    return Response.json(
      {
        error: 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}) satisfies RequestHandler;
