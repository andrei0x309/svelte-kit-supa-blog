import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { config } from '#lib/config/index.ts';
import { findCat, loadPostsByCat } from '#lib/utils/db/posts.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'Category not found'
} as App.Error;

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug;
  const cat = (await findCat(slug))?.data?.[0];
  if (!cat) {
    throw error(404, defaultError.message);
  }
  const { num } = req.params as { num: string };
  let page: number;
  if (!num) {
    page = 1;
  } else {
    page = Number.isInteger(Number(num)) ? parseInt(num) : 1;
  }
  const dataPosts = await loadPostsByCat(cat.id, page);

  const pageText = page > 1 ? `| Page ${page}` : '';
  const description = cat.description ? `| ${cat.description}` : '';

  return appendToData(checkData(dataPosts), {
    pageTitle: `Category ${cat.name} | ${config.siteName} ${pageText}`,
    pageDescription: `Articles from category ${cat.name} ${description}`,
    cat
  });
};
