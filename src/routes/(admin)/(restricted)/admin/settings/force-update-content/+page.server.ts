import { fail } from '@sveltejs/kit';
import type { ICookies } from '#/lib/types/cookies.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import { getGoodReadsData, getTagCloud } from '#/lib/utils/server/widgets.ts';
import type { Actions } from './$types';

const runUpdate = async (update: () => Promise<unknown>, successMessage: string) => {
  try {
    await update();
    return { success: true, message: successMessage };
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : 'Unexpected error';
    return fail(500, { success: false, message: `Update failed: ${detail}` });
  }
};

const runAdminUpdate = async (req: ICookies, update: () => Promise<unknown>, successMessage: string) => {
  let currentUser;
  try {
    currentUser = await checkAuth(req);
  } catch (cause) {
    if (cause === 'denied') {
      return fail(403, { success: false, message: 'Access denied.' });
    }
    throw cause;
  }

  if (currentUser.role !== 'admin') {
    return fail(403, { success: false, message: 'Only admins can force-update content.' });
  }

  return runUpdate(update, successMessage);
};

export const actions = {
  all: async ({ cookies }) => runAdminUpdate({ cookies } as ICookies, () => Promise.all([getTagCloud(true), getGoodReadsData(true)]), 'All content was updated successfully.'),
  tagCloud: async ({ cookies }) => runAdminUpdate({ cookies } as ICookies, () => getTagCloud(true), 'Tag cloud was updated successfully.'),
  goodReads: async ({ cookies }) => runAdminUpdate({ cookies } as ICookies, () => getGoodReadsData(true), 'Goodreads content was updated successfully.')
} satisfies Actions;
