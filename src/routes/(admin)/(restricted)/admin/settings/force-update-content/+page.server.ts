import { fail } from '@sveltejs/kit';
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

export const actions = {
  all: async () =>
    runUpdate(
      () => Promise.all([getTagCloud(true), getGoodReadsData(true)]),
      'All content was updated successfully.'
    ),
  tagCloud: async () => runUpdate(() => getTagCloud(true), 'Tag cloud was updated successfully.'),
  goodReads: async () => runUpdate(() => getGoodReadsData(true), 'Goodreads content was updated successfully.')
} satisfies Actions;
