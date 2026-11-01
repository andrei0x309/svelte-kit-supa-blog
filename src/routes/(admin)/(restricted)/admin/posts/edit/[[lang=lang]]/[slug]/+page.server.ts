import { loadCats, loadPost } from '#/lib/utils/db/posts.ts';
import type { ICat, IPost, ITag } from '#lib/types/post.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (req) => {
  try {
    let slug;
    if (req.params?.lang) {
      slug = req.params.lang + '/' + req.params.slug;
    } else {
      slug = req.params.slug;
    }
    if (slug) {
      const data = await Promise.all([loadPost(slug, true) as Promise<{ [key: string]: Record<string, any> }>, loadCats()]);
      if (data) {
        return {
          post: data?.[0]?.res as IPost,
          tags: data?.[0].tags as ITag[],
          cats: data?.[1].data as ICat[]
        };
      } else {
        return {
          notFound: true
        };
      }
    }
  } catch (e) {
    return {
      notFound: true
    };
  }
}) satisfies PageServerLoad;
