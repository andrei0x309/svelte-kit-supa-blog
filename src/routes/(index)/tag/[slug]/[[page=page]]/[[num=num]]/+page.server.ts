import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { config } from '#lib/config/index.ts';
import { findTag, loadPostsByTag } from '#lib/utils/db/posts.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'Tag not found'
} as App.Error;

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug;
  const tag = (await findTag(slug))?.data?.[0];
  if (!tag) {
    throw error(404, defaultError.message);
  }
  const { num } = req.params as { num: string };
  let page: number;
  if (!num || isNaN(parseInt(num))) {
    page = 1;
  } else {
    page = parseInt(num);
  }

  const hasPage = req.url.searchParams.has('page');
  const pageInTitle = hasPage ? ` | Page ${page}` : '';

  const dataPosts = await loadPostsByTag(tag.id, page);

  return appendToData(checkData(dataPosts), {
    pageTitle: `Tag  ${tag.name ? tag.name : ''}${pageInTitle} | ${config.siteName}`,
    pageDescription: `Articles from tag ${tag?.name ? tag.name : ''} ${tag?.description}`,
    tag
  });
};
