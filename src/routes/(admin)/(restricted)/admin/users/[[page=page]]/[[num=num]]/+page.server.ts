import { loadUsers } from '@/lib/utils/db/users' 
import type { PageServerLoad } from '../../$types';


export const load: PageServerLoad = (async (req) => {
    try {
    const { num } = req.params as {num: string}
    let page: number
    if(!num) {
        page = 1
    } else {
        page = parseInt(num)
    }
    const usersData = await loadUsers(page, 4) as unknown as {res: {data: unknown, page: number, hasNext: boolean}}
    return {
        users: usersData?.res?.data,
        page: usersData?.res?.page,
        hasNext: usersData?.res?.hasNext
    }    
    } catch (e) {
        return {
            users: null
        }
    }
}) satisfies PageServerLoad

