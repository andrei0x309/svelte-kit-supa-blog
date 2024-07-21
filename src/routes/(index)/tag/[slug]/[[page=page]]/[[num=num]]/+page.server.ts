import { findTag, loadPostsByTag } from '$lib/utils/db/posts'
import type { PageServerLoad } from './$types';
import { checkData, appendToData } from '@/lib/utils/page'
import { error } from '@/lib/utils/page'
import { config } from '$lib/config'

const defaultError = {
  message: 'Tag not found',
  pageType: 'tag'
} as App.Error

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug
  const tag = (await findTag(slug))?.data?.[0]
  if (!tag) {
    throw error(404, defaultError)
  }
  const { num } = req.params as { num: string }
  let page: number
  if (!num || isNaN(parseInt(num))) {
    page = 1
  } else {
    page = parseInt(num)
  }

  const hasPage = req.url.searchParams.has('page')

  const dataPosts = await loadPostsByTag(tag.id, page)

  return appendToData(checkData(dataPosts),
    {
      pageTitle: 'Tag  ' + tag.name + ' ' + (hasPage ? ` Page ${page}` : null ?? config.siteName),
      pageDescription: 'Articles from tag ' + tag.name + ' - ' + tag?.description ?? config.siteIndexDescription + (hasPage ? ` Page ${page}` : null),
      tag
    })
}
