import { supabase } from '@/lib/node/supaClientFS'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (req) => {
    try {
        const id = req.params?.id
        if(id) {
        const user = (await supabase.from('fsk_blog_author').select('*').eq('id', id).single()).data
            if(user) {
                return {
                    user
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
}
