import { loadCategories } from '@/lib/utils/db/catOrTag'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (req) => {
    try {
        const data =  await loadCategories()
            return {
                catOrTags: data || []
                }
    } catch (e) {
        return {
            notFound: true
        }
    }
}) satisfies PageServerLoad



