import { loadPosts } from '#/lib/utils/db/posts.ts';
import { appendToData, checkData, error, extractPage } from '#/lib/utils/page.ts';
import { getIndexSchema } from '#/lib/utils/server/schema.ts';
import { config } from '#lib/config/index.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (rest) => {
  const slug = rest.params.rest ?? '/';
  if (!rest.params.rest) {
    const data = await loadPosts(1);
    return appendToData(checkData(data), { slug, pageTitle: config.siteIndexTitle, pageDescription: config.siteIndexDescription });
  } else {
    const params = rest.params.rest.split('/');
    switch (params[0]) {
      case 'page': {
        const page = extractPage(rest.params.rest);

        const data = await loadPosts(page);
        return appendToData(checkData(data), {
          slug,
          pageTitle: `${config.siteName} | Page ${page}`,
          pageDescription: `${config.siteIndexDescription} | Page ${page}`,
          schemaContent: getIndexSchema()
        });
      }

      default: {
        throw error(404, 'Resource not found');
      }
    }
  }
};
