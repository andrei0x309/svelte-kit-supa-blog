import { findCat, loadPostsByCat } from '$lib/utils/db/posts'
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import { error } from '@/lib/utils/page'
import {config} from '$lib/config'

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug
    const cat = (await findCat(slug))?.data?.[0]
    if(!cat) {
      throw error(404, 'Not found')
    }
    const { num } = req.params as {num: string}
    let page: number
    if(!num) {
        page = 1
    } else {
        page = parseInt(num)
    }
    const dataPosts = await loadPostsByCat(cat.id, page)

    return appendToData(checkData(dataPosts), 
    {pageTitle: 'Category ' +cat.name + (page > 1 ? ` Page ${page}` : null ?? config.siteName), 
    pageDescription: 'Articles from category ' + cat.name + (page > 1 ? ` Page ${page}` : null ?? config.siteIndexDescription),
    cat
    })
  }