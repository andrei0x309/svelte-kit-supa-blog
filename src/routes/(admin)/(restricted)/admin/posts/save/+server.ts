import truncate from 'truncate-html';
import { supabase } from '#/lib/node/supaClientFS.ts';
import { dec_tags_count, inc_tags_count, loadPost } from '#/lib/utils/db/posts.ts';
import { checkAuth } from '#/lib/utils/server/auth.ts';
import type { ICookies } from '#lib/types/cookies.ts';
import type { IPost, IRelatedPost } from '#lib/types/post.ts';
import type { RequestHandler } from './$types';
// import { getSetting, STORE } from '#lib/utils/server/settings.ts'
// import { pinPostToPinata } from '#lib/utils/server/pinata.ts'

export const POST: RequestHandler = (async ({ request, cookies }) => {
  try {
    const req = { cookies } as ICookies;
    const currentUser = await checkAuth(req);
    const { slug, title, content, tags_id, cat_id, author_id, seo_description, feature_image, feature_image_alt, schema, related, draft } = await request.json();

    if (currentUser.role === 'demo') {
      return Response.json(
        {
          error: "Demo User can't take this action"
        },
        { status: 403 }
      );
    }

    const requestedAuthorId = author_id !== undefined && author_id !== null ? Number(author_id) : null;
    const isAdmin = currentUser.role === 'admin';
    if (!slug) {
      return Response.json(
        {
          error: 'Slug is required'
        },
        { status: 400 }
      );
    }
    const exists = await loadPost(slug);

    if (exists?.res?.slug) {
      if (exists.res.author_id !== currentUser.id && !isAdmin) {
        return Response.json(
          {
            error: 'Only admin edit other users posts'
          },
          { status: 403 }
        );
      }
      if (requestedAuthorId !== null && requestedAuthorId !== exists.res.author_id && !isAdmin) {
        return Response.json(
          {
            error: 'You cannot change the author of an existing post'
          },
          { status: 403 }
        );
      }
    } else {
      if (!slug || !title || !content) {
        return Response.json(
          {
            error: 'Required fields are missing( slug, title, content )'
          },
          { status: 400 }
        );
      }
      if (requestedAuthorId !== null && requestedAuthorId !== currentUser.id && !isAdmin) {
        return Response.json(
          {
            error: 'You cannot assign a different author_id when creating a post'
          },
          { status: 403 }
        );
      }
    }
    const update = {} as IPost;
    update.slug = slug;
    update.title = title;
    update.content = content;
    update.author_id = requestedAuthorId !== null && isAdmin ? requestedAuthorId : currentUser.id;
    const lang = slug.includes('/') ? slug.split('/')[0] : 'en';
    update.language = lang;
    if (cat_id) update.cat_id = cat_id;
    if (tags_id) update.tags_id = tags_id;
    if (seo_description) update.seo_description = seo_description;
    if (feature_image) update.feature_image = feature_image;
    if (feature_image_alt) update.feature_image_alt = feature_image_alt;
    if (schema) update.schema = schema;
    if (typeof draft === 'boolean') update.draft = draft === true ? true : false;
    update.content_text = String(truncate(content, content.length, { stripTags: true }));

    if (related) {
      if (!Array.isArray(related)) {
        return Response.json(
          {
            error: 'Invalid JSON for related posts must be an array'
          },
          { status: 400 }
        );
      }
      if (related.length > 5) {
        return Response.json(
          {
            error: 'Invalid JSON for related posts must be an array with max 3 items'
          },
          { status: 400 }
        );
      }
      if (
        related.length > 0 &&
        related.some((r: IRelatedPost) => {
          if (!r.slug || !r.title || !r.feature_image || !r.excerpt) {
            return true;
          }
          return false;
        })
      ) {
        return Response.json(
          {
            error: 'Invalid JSON for related posts must be an array of objects with slug, title, feature_image and excerpt'
          },
          { status: 400 }
        );
      } else {
        update.related = JSON.stringify(related) as any;
      }
    }

    // const ipfsPublish = (await getSetting(STORE.IPFS_PUBLISH))?.value === 'true' ? true : false
    // if(ipfsPublish) {
    //     const source = await pinPostToPinata(update)
    //     // if(source) {
    //     //     update.ipfs_source = source
    //     // }
    //     console.log(source)
    // }

    await supabase.from('fsk_blog_posts').upsert(update);

    if (!exists?.res?.slug) {
      await inc_tags_count(tags_id);
    } else {
      let arrPromises = [];
      const inc_tags = tags_id.filter((t: number) => !exists.res.tags_id.includes(t));
      const dec_tags = exists.res.tags_id.filter((t: number) => !tags_id.includes(t));
      if (inc_tags.length > 0) arrPromises.push(inc_tags_count(inc_tags));
      if (dec_tags.length > 0) arrPromises.push(dec_tags_count(dec_tags));
      if (arrPromises.length > 0) await Promise.all(arrPromises);
    }

    return Response.json(
      {
        success: true
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
