
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import truncate from "truncate-html";
import { loadPost } from '@/lib/utils/db/posts'
import { getPostSchema } from '@/lib/utils/server/schema'
import type { IPost } from '$lib/types/post'

export const load: PageServerLoad = async (data) => {
    let slug
    if(data.params?.lang) {
      slug = data.params.lang + '/' + data.params.slug
    } else {
      slug = data.params.slug
    } 
    const post = await loadPost(slug) as {res: Record<string, any>}
    const fallBackDescription = post?.res?.seo_description || truncate(post?.res?.content, 160, {
      stripTags: true
    }) || 'Desciption is missing | blog.flashsoft.eu'
    return appendToData(
      checkData(post), 
      {pageTitle: post?.res?.title ?? 'Blog | flashsoft.eu', 
      pageDescription: post?.res?.seo_description || fallBackDescription,
      schemaContent: getPostSchema((post.res ?? null) as unknown as IPost)
    })
  }
