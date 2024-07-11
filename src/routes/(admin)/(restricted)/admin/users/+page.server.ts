import { loadUsers } from '@/lib/utils/db/users' 
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = (async (req) => {
    try {
    const { num } = req.params as {num: string}
    let page: number
    if(!num) {
        page = 1
    } else {
        page = parseInt(num)
    }
    const postsData = await loadUsers(page, 4) as unknown as {res: {data: unknown, page: number, hasNext: boolean}}
    return {
        users: postsData?.res?.data,
        page: postsData?.res?.page,
        hasNext: postsData?.res?.hasNext
    }    
    } catch (e) {
        console.log(e)
        return {
            users: null
        }
    }
}) satisfies PageServerLoad

