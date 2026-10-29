import truncate from 'truncate-html';
import { loadPost } from '#/lib/utils/db/posts.ts';
import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
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
  let slug;
  if (req.params?.lang) {
    slug = req.params.lang + '/' + req.params.slug;
  } else {
    slug = req.params.slug;
  }
  const post = (await loadPost(slug, true)) as { res: Record<string, any> };
  const fallBackDescription =
    post?.res?.seo_description ||
    truncate(post?.res?.content, 160, {
      stripTags: true
    }) ||
    'Desciption is missing | blog.flashsoft.eu';
  return appendToData(checkData(post), {
    pageTitle: post?.res?.title ?? 'Blog | flashsoft.eu',
    pageDescription: post?.res?.seo_description || fallBackDescription
  });
};
