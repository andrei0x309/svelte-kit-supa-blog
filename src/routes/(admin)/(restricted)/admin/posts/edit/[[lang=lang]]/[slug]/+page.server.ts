import { loadPost } from '@/lib/utils/db/posts'
import { loadCats } from '@/lib/utils/db/posts'
import type { PageServerLoad } from './$types';
import type { IPost, ICat, ITag } from '$lib/types/post';

export const load: PageServerLoad = (async (req) => {
    try {
        let slug
        if(req.params?.lang) {
          slug = req.params.lang + '/' + req.params.slug
        } else {
          slug = req.params.slug
        } 
        if(slug) {
        const data =  await Promise.all([(loadPost(slug, true) as Promise<{[key: string]: Record<string, any>}>), loadCats()])
            if(data) {
                return {
                    post: data?.[0]?.res as IPost,
                    tags: data?.[0].tags as ITag[],
                    cats: data?.[1].data as ICat[]
                }
            } else {
                return {
                    notFound: true
                }
            }         
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}) satisfies PageServerLoad
