
import type { PageServerLoad } from './$types';
import { checkData, appendToData, extractPage } from '@/lib/utils/page'
import truncate from "truncate-html";
import { loadPost, loadPosts } from '@/lib/utils/db/posts'
import { getPostSchema } from '@/lib/utils/server/schema'
import type { IPost } from '$lib/types/post'
import { isSupportedLang } from '@/lib/utils/server/lang'
import { config } from '$lib/config'
import { getIndexSchema } from '@/lib/utils/server/schema'


export const load: PageServerLoad = async (data) => {
    let slug
    if(data.params?.lang) {
      slug = data.params.lang + '/' + data.params.slug
    } else {
      slug = data.params.slug
    }
    if (slug.endsWith('/')) slug = slug.slice(0, -1)

    if(isSupportedLang(slug)) {
      const page = extractPage(slug)

      const data = await loadPosts(page, config.indexPostsPerPage, `*`, false, slug)

      return appendToData(checkData(data), {
        slug, 
        pageTitle: `${config.siteName} | Page ${page}`, 
        pageDescription: `${config.siteIndexDescription} | Page ${page}`,
        isPostList: true,
      schemaContent: getIndexSchema()
    })
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
