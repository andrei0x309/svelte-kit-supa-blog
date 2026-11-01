import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import { loadLast20Drafts } from '#lib/utils/db/previews.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'Unauthorized'
} as App.Error;

export const load: PageServerLoad = async (req) => {
  try {
    await checkAuth(req as ICookies);
  } catch {
    throw error(401, defaultError.message);
  }

  const dataPosts = await loadLast20Drafts();

  return appendToData(checkData(dataPosts), { pageTitle: 'Preview Draft Posts ', pageDescription: 'Preview Draft Posts Auth Needed' });
};
