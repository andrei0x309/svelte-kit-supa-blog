import type { RequestHandler } from  './$types';
import { loadPosts } from '@/lib/utils/db/posts';
import type { IPost } from '$lib/types/post';
import { generateRssFeed, generateRssNotFound } from '$lib/utils/server/feed'
import { getLatsPostDate } from '$lib/utils/db/posts'


export const GET: RequestHandler = (async ({ url }) => {
    const lastPostDateP = getLatsPostDate()
    const paged = Number(url.searchParams.get('paged') || '1') || 1
    try {
        const postsP = loadPosts(paged)
        let [posts, lastPostDate] = await Promise.all([postsP, lastPostDateP])
        if(posts?.res?.data?.length === 0) {
            return new Response(
                generateRssNotFound(new Date(lastPostDate), paged),
               {
                 headers: {
                   'Content-Type': 'application/xml'
                 }
               }
             );
        }
        posts = posts?.res?.data

        const feed = generateRssFeed(posts as unknown as IPost[], new Date(lastPostDate), paged)

        return new Response(
             feed,
            {
              headers: {
                'Content-Type': 'application/xml'
              }
            }
          );

    } catch (e) {
        console.log(e)
        return new Response(
            generateRssNotFound(new Date(await lastPostDateP), paged),
           {
             headers: {
               'Content-Type': 'application/xml'
             }
           }
         );
    }
    
}) satisfies RequestHandler;
