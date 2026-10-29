import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { loadPostsBySearch } from '#lib/utils/db/posts.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'No Query Provided'
} as App.Error;

export const load: PageServerLoad = async (req) => {
  let q = String(req.url.searchParams.get('q') ?? '');

  if (!q) {
    throw error(401, defaultError.message);
  }
  const query = decodeURIComponent(q).split(' ');
  const page = Number(req.url.searchParams.get('page') || '1') || 1;

  const dataPosts = await loadPostsBySearch(query, page);

  return appendToData(checkData(dataPosts), {
    pageTitle: 'Search  ' + query[0] + '...' + (page > 1 ? ` Page ${page}` : ''),
    pageDescription: 'Search for query' + query.join(' ') + (page > 1 ? ` Page ${page}` : ''),
    query: query.join(' ')
  });
};
