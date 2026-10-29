import { error } from '@sveltejs/kit';
import { supabase } from '#/lib/node/supaClientFS.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import type { LayoutServerLoad } from './$types';

export const load = (async (req) => {
  try {
    const { username } = await checkAuth(req as ICookies);
    const currentUser = await supabase.from('fsk_blog_author').select('*').eq('username', username).single();
    return {
      currentUser: currentUser.data
    };
  } catch (e) {
    if (e === 'denied') {
      error(403, 'Forbidden');
    }
  }
}) satisfies LayoutServerLoad;
