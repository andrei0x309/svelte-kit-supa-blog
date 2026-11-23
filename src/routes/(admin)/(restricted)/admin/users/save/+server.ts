import { supabase } from '#/lib/node/supaClientFS.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import { getSha256 } from '#/lib/utils/server/crypto.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import type { ICurrentUser } from '#lib/types/user.ts';
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

    const { username, email, avatar, id, role, password, description } = await request.json();
    if (currentUser.role !== 'admin') {
      return Response.json(
        {
          error: 'Only admin can edit or create users'
        },
        { status: 403 }
      );
    }
    const update = {} as ICurrentUser;
    if (username) update.username = username;
    if (email) update.email = email;
    if (avatar) update.avatar = avatar;
    if (description) update.description = description;
    if (role) update.role = role;
    if (password) update.password_hash = await getSha256(password);
    if (role) {
      if (!['admin', 'contribuitor', 'demo'].includes(role)) {
        return Response.json(
          {
            error: 'Invalid role!'
          },
          { status: 400 }
        );
      }
      update.role = role;
    }
    if (id) {
      update.id = id;
      update.updated_at = new Date().toISOString();
      await supabase.from('fsk_blog_author').upsert(update);
    } else {
      await supabase.from('fsk_blog_author').insert(update);
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
