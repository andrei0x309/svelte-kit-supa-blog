import { redirect } from '@sveltejs/kit';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (req) => {
  try {
    await checkAuth(req as ICookies);
    throw 'redirect';
  } catch (e) {
    if (e === 'redirect') {
      redirect(302, '/admin');
    }
    return {};
  }
};
