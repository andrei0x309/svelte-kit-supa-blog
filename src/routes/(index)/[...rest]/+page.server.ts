import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page'
import { loadPosts } from '@/lib/utils/db/posts'
import { config } from '$lib/config';
import { getIndexSchema } from '@/lib/utils/server/schema'

export const load: PageServerLoad = async (rest) => {
  const slug = rest.params.rest ?? '/'
  if(!rest.params.rest) {
    const data = await loadPosts(1)
    return appendToData(checkData(data), {slug, pageTitle: config.siteIndexTitle, pageDescription: config.siteIndexDescription})
  } else {
    const params = rest.params.rest.split('/')
    switch(params[0]){
      case 'page': {
      const page = extractPage(rest.params.rest)

      const data = await loadPosts(page)
      return appendToData(checkData(data), {slug, pageTitle: `${config.siteName} | Page ${page}`, pageDescription: `${config.siteIndexDescription} | Page ${page}`,
      schemaContent: getIndexSchema()
    })
    }
    
    default: {
      throw error(404, {
        message: 'No posts found',
        pageType: 'posts'
      } as App.Error)
    }
  }
 }
}
