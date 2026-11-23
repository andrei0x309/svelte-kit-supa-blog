import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies }) => {
  cookies.delete('session', { path: '/' });
  cookies.delete('hash', { path: '/' });
  cookies.delete('username', { path: '/' });
  return Response.json({ ok: true }, { status: 200 });
};
