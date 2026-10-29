import { json } from '@sveltejs/kit';
import { supabase } from '#/lib/node/supaClientFS';
import { createSessionToken } from '#/lib/utils/server/auth.ts';
import { getSha256 } from '#/lib/utils/server/crypto';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ error: 'Missing username or password' }, { status: 400 });
    }

    const user = (await supabase.from('fsk_blog_author').select('id, username, password_hash, role').eq('username', username).single()).data;
    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }
    const hash = await getSha256(password);

    if (hash !== user.password_hash) {
      return json({ error: 'Wrong password' }, { status: 401 });
    }

    const sessionToken = await createSessionToken(user.username, user.id);
    cookies.set('session', sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 90
    });
    cookies.delete('hash', { path: '/' });
    cookies.delete('username', { path: '/' });

    return json({ data: 'ok', role: user.role }, { status: 200 });
  } catch (e) {
    console.log(e);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}) satisfies RequestHandler;
