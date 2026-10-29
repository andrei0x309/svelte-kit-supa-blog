import { supabase } from '#/lib/node/supaClientFS.ts';
import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { loadLast20Drafts } from '#lib/utils/db/previews.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'Unauthorized'
} as App.Error;

export const load: PageServerLoad = async (req) => {
  const username = req.cookies.get('username');
  const hash = req.cookies.get('hash');

  if (username && hash) {
    const user = (await supabase.from('fsk_blog_author').select('username, password_hash').eq('username', username).single()).data;
    if (user) {
      if (hash !== user.password_hash) {
        throw error(401, defaultError.message);
      }
    }
  }

  const dataPosts = await loadLast20Drafts();

  return appendToData(checkData(dataPosts), { pageTitle: 'Preview Draft Posts ', pageDescription: 'Preview Draft Posts Auth Needed' });
};
