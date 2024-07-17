import { loadPosts } from '@/lib/utils/db/posts' 
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (req) => {
    try {
    const { num } = req.params 
    let page: number
    if(!num) {
        page = 1
    } else {
        page = parseInt(num)
    }
    const postsData = await loadPosts(page, 11, 'title, signature, feature_image, slug, cat_id, author_id, tags_id') as unknown as {res: {data: unknown, page: number, hasNext: boolean}}
    return {
        posts: postsData?.res?.data,
        page: postsData?.res?.page,
        hasNext: postsData?.res?.hasNext
    }    
    } catch (e) {
        return {
            posts: null
        }
    }
}

