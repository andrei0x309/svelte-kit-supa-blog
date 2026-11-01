import { loadCategories } from '#/lib/utils/db/catOrTag.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (req) => {
  try {
    const data = await loadCategories();
    return {
      catOrTags: data || [],
      notFound: false
    };
  } catch (e) {
    return {
      catOrTags: null,
      notFound: true
    };
  }
}) satisfies PageServerLoad;
