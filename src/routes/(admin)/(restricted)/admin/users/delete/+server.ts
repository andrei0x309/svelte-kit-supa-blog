import { supabase } from '#/lib/node/supaClientFS.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
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

    const { id } = await request.json();
    if (currentUser.role !== 'admin') {
      return Response.json(
        {
          error: 'Only admin can delete users'
        },
        { status: 403 }
      );
    }
    if (currentUser.id === id) {
      return Response.json(
        {
          error: 'You cannot delete yourself'
        },
        { status: 403 }
      );
    }
    if (id) {
      await supabase.from('fsk_blog_author').delete().eq('id', id);
      return Response.json(
        {
          success: true
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        error: 'No id provided'
      },
      { status: 400 }
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
