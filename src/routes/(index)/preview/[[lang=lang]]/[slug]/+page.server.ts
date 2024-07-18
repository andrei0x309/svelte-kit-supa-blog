
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import truncate from "truncate-html";
import { loadPost } from '@/lib/utils/db/posts'
import { getSchemaContent } from '@/lib/utils/server/schema'
import type { IPost } from '$lib/types/post'
import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@/lib/utils/page'

export const load: PageServerLoad = async (req) => {
    const username = req.cookies.get('username')
    const hash = req.cookies.get('hash')

    if(username && hash){
        const user = (await supabase.from('fsk_blog_author')
        .select('username, password_hash')
        .eq('username', username).single()).data
        if(user) {
            if(hash !== user.password_hash) {
                throw error(401, 'Unauthorized')
            }
        }
    }
    let slug
    if(req.params?.lang) {
      slug = req.params.lang + '/' + req.params.slug
    } else {
      slug = req.params.slug
    } 
    const post = await loadPost(slug, true) as {res: Record<string, any>}
    const fallBackDescription = post?.res?.seo_description || truncate(post?.res?.content, 160, {
      stripTags: true
    }) || 'Desciption is missing | blog.flashsoft.eu'
    return appendToData(
      checkData(post), 
      {pageTitle: post?.res?.title ?? 'Blog | flashsoft.eu', 
      pageDescription: post?.res?.seo_description || fallBackDescription,
      schemaContent: getSchemaContent((post.res ?? null) as unknown as IPost)
    })
  }
