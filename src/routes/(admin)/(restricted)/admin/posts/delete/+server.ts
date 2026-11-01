import { supabase } from '#/lib/node/supaClientFS.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import { dec_tags_count, loadPost } from '#lib/utils/db/posts.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
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

    const { slug } = await request.json();
    if (!slug) {
      return Response.json(
        {
          error: 'No slug provided'
        },
        { status: 400 }
      );
    }
    const exists = await loadPost(slug, true);

    if (!exists?.res?.slug) {
      return Response.json(
        {
          error: 'Post does not exist'
        },
        { status: 400 }
      );
    }
    if (exists.res.author_id !== currentUser.id && currentUser.role !== 'admin') {
      return Response.json(
        {
          error: 'Only admin delete other users posts'
        },
        { status: 403 }
      );
    }
    await supabase.from('fsk_blog_posts').delete().eq('slug', slug);
    if (exists.res.tags_id) {
      await dec_tags_count(exists.res.tags_id);
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
