import { getLatsPostDate, getTotalPostsCount, loadPosts } from '#/lib/utils/db/posts.ts';
import { config } from '#lib/config/index.ts';
import type { IPost } from '#lib/types/post.ts';
import { generateRssFeed, generateRssNotFound } from '#lib/utils/server/feed.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (async ({ url }) => {
  const lastPostDateP = getLatsPostDate();
  const totalPostsP = getTotalPostsCount(false); // only published posts
  const paged = Math.max(1, Number(url.searchParams.get('paged')) || 1);
  const perPage = config.indexPostsPerPage;

  try {
    const postsP = loadPosts(paged);
    let [posts, lastPostDate, totalPosts] = await Promise.all([postsP, lastPostDateP, totalPostsP]);

    if (!posts?.res?.data || posts.res.data.length === 0) {
      return new Response(generateRssNotFound(new Date(lastPostDate), paged), {
        status: 404,
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=18000'
        }
      });
    }

    const totalPages = Math.ceil(totalPosts / perPage);
    const hasNextPage = paged < totalPages;

    const feed = generateRssFeed(posts.res.data as unknown as IPost[], new Date(lastPostDate), paged, { totalPages, hasNextPage });

    return new Response(feed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=18000'
      }
    });
  } catch (e) {
    return new Response(generateRssNotFound(new Date(await lastPostDateP), paged), {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    });
  }
}) satisfies RequestHandler;
