import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import { loadRelatedPosts } from '#lib/utils/db/posts.ts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = (async ({ request, cookies }) => {
  try {
    const req = { cookies } as ICookies;
    await checkAuth(req);
    const { slugs, slug } = await request.json();

    if (!slugs) {
      return Response.json(
        {
          error: 'No slugs provided'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(slugs)) {
      return Response.json(
        {
          error: 'Slugs is not an array'
        },
        { status: 400 }
      );
    }

    if (slugs.length === 0) {
      return Response.json(
        {
          error: 'Slugs is empty'
        },
        { status: 400 }
      );
    }
    const relatedPosts = await loadRelatedPosts({
      tag_ids: slugs,
      slugs: true,
      slug
    } as any);
    return Response.json(
      {
        relatedPosts
      },
      { status: 200 }
    );
  } catch (e) {
    if (e === 'denied') {
      return Response.json(
        {
          error: 'Access denied'
        },
        { status: 403 }
      );
    }
    return Response.json(
      {
        error: 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}) satisfies RequestHandler;
