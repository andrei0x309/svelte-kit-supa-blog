import { loadTags } from '@/lib/utils/db/posts'
import { loadCats } from '@/lib/utils/db/posts'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (req) => {
    try {
        const data =  await Promise.all([loadTags(), loadCats()])
                return {
                    tags: data?.[0].data,
                    cats: data?.[1].data
                }
    } catch (e) {
        return {
            notFound: true
        }
    }
}) satisfies PageServerLoad
