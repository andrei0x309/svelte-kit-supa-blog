import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies }) => {
  cookies.delete('session', { path: '/' });
  cookies.delete('hash', { path: '/' });
  cookies.delete('username', { path: '/' });
  return json({ ok: true }, { status: 200 });
};
