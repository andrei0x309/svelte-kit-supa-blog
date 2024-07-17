import { findTag, loadPostsByTag } from '$lib/utils/db/posts'
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import { error } from '@/lib/utils/page'
import {config} from '$lib/config'

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug
    const tag = (await findTag(slug))?.data?.[0]
    if(!tag) {
      throw error(404, 'Not found')
    }
    const { num } = req.params as {num: string}
    let page: number
    if(!num) {
        page = 1
    } else {
        page = parseInt(num)
    }
    const dataPosts = await loadPostsByTag(tag.id, page)

    return appendToData(checkData(dataPosts), 
    {pageTitle: 'Tag  ' +tag.name + (page > 1 ? ` Page ${page}` : null ?? config.siteName), 
    pageDescription: 'Articles from category ' + tag.name + (page > 1 ? ` Page ${page}` : null ?? config.siteIndexDescription),
    tag
    })
  }
