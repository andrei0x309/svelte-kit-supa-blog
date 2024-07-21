import { supabase } from '@/lib/node/supaClientFS'
import truncate from "truncate-html";
import { config } from '@/lib/config';

export const preparePostResponse = ({
  tags,
  res,
  page = 1,
  perPege = 4,
  single = false
}: {
  tags: any
  res: any,
  page?: number,
  perPege?: number,
  single?: boolean
}) => {

  const tagsMap = tags.data?.reduce((acc: { [key: number]: Record<string, unknown> }, tag: { id: number }) => {
    acc[tag.id] = tag
    return acc
  }, {})
  const hasNext = res.data?.length === (perPege + 1)
  res.data = res.data?.slice(0, perPege) ?? []

  res.data = res.data?.map((r: any) => {
    r.tags = r.tags_id.map((id: number) => tagsMap[id])
    r.isFull = false
    if (r?.content && !single) {
      r.content = truncate(r.content, 500)
    }
    return r
  })

  if (!single) {
    ; (res as unknown as { page: number }).page = page
      ; (res as unknown as { hasNext: boolean }).hasNext = hasNext
  }

  if (single) {
    res.data = res.data?.[0]
    if (res.data?.content) {
      res.data.isFull = true
    }

    return {
      res: res.data,
      tags: tags.data
    }

  }

  return {
    res
  };

}

export const loadTags = () => {
  return supabase.from('fsk_blog_tag').select('*')
}

export const loadPosts = async (page: number, perPege = config.indexPostsPerPage, select = '*', draft = false, lang = '') => {
  try {
    const tagsDB = loadTags()
    const resDb = supabase.from('fsk_blog_posts').select(`
    ${select},
    cat:fsk_blog_cat(
        id,
        name,
        description,
        slug
    ),
    author:fsk_blog_author(
      id,
      name,
      username,
     avatar
     ) 
    `.toString())
      if(!draft) {
        resDb.eq('draft', false)
      }
      if(lang) {
        resDb.eq('language', lang)
      }
      resDb
      .order('created_at', { ascending: false })
      .range((page - 1) * perPege, page * perPege)
    const [tags, res] = await Promise.all([tagsDB, resDb])

    return preparePostResponse({
      tags,
      res,
      page,
      perPege
    })

  } catch (e) {
    return null
  }
}


export const loadPost = async (slug: string, loadDraft = false) => {
  try {
    const tagsDB = loadTags()
    const resDb = supabase.from('fsk_blog_posts').select(`
    *,
    cat:fsk_blog_cat(
        id,
        name,
        description,
        slug
    ),
    author:fsk_blog_author(
      id,
      name,
      username,
     avatar
     ) 
    `)
      .eq(
        'slug', slug
      )

    if(!loadDraft) {
      resDb.eq('draft', false)
    }

    const [tags, res] = await Promise.all([tagsDB, resDb])

    return preparePostResponse({
      tags,
      res,
      single: true
    })

  } catch (e) {
    console.log(e)
    return null
  }
}

export const loadCats = () => {
  return supabase.from('fsk_blog_cat').select('*')
}

export const loadRelatedPosts = async ({
  tag_ids = [] as number[] | string[], slugs = false, slug = ''
}) => {
  try {
    const resDb = supabase.from('fsk_blog_posts').select(`*`)
    resDb.neq('slug', slug)
    resDb.eq('draft', false)
    if (tag_ids.length && !slugs) {
      resDb.overlaps('tags_id', tag_ids)
    } else if (tag_ids.length && slugs) {
      const slugs = tag_ids as string[]
      resDb.in('slug', slugs)
    }
    resDb.order('created_at', { ascending: false })
      .limit(3)

    const res = await resDb

    if ((res.data ?? []).length < 3 && !slugs) {
      const resDb2 = supabase.from('fsk_blog_posts').select(`*`)
        .order('created_at', { ascending: false })
        .neq('slug', slug)
        .eq('draft', false)
        .limit(3)
      const res2 = await resDb2
      res.data = [...(res.data ?? []), ...(res2.data ?? [])].slice(0, 3)
    }

    return {
      res: res.data
    };
  } catch (e) {
    console.log(e)
    return null
  }
}

export const loadPostsByCat = async (cat_id: number, page: number, perPege = 4, select = '*') => {
  try {
    const tagsDB = loadTags()
    const resDb = supabase.from('fsk_blog_posts').select(`
    ${select},
    cat:fsk_blog_cat(
        id,
        name,
        description,
        slug
    ),
    author:fsk_blog_author(
      id,
      name,
      username,
     avatar
     ) 
    `.toString())
      .eq('draft', false)
      .order('created_at', { ascending: false })
      .range((page - 1) * perPege, page * perPege)
      .eq('cat_id', cat_id)
    const [tags, res] = await Promise.all([tagsDB, resDb])

    return preparePostResponse({
      tags,
      res,
      page,
      perPege
    })
  } catch (e) {
    return null
  }
}

export const findCat = async (slug: string) => {
  return await supabase.from('fsk_blog_cat').select('*').eq('slug', slug)
}

export const findTag = async (slug: string) => {
  return await supabase.from('fsk_blog_tag').select('*').eq('slug', slug)
}

export const loadPostsByTag = async (tag_id: number, page: number, perPege = 4, select = '*') => {
  try {
    const tagsDB = loadTags()
    const resDb = supabase.from('fsk_blog_posts').select(`
    ${select},
    cat:fsk_blog_cat(
        id,
        name,
        description,
        slug
    ),
    author:fsk_blog_author(
      id,
      name,
      username,
     avatar
     ) 
    `.toString())
      .eq('draft', false)
      .contains('tags_id', [tag_id])
      .order('created_at', { ascending: false })
      .range((page - 1) * perPege, page * perPege)
    const [tags, res] = await Promise.all([tagsDB, resDb])

    return preparePostResponse({
      tags,
      res,
      page,
      perPege
    })
  } catch (e) {
    return null
  }
}

export const getLatsPostDate = async () => {
  const res = await supabase.from('fsk_blog_posts').select('created_at').order('created_at', { ascending: false }).limit(1)
  return res.data?.[0]?.created_at ?? new Date(Date.now() - 1000 * 60 * 60 * 10)
}

export const loadPostsBySearch = async (terms: string[], page: number, perPege = 4, select = '*') => {
  try {
    const query = terms.map(term => `'${term}'`).join(' & ')

    const tagsDB = loadTags()
    const resDb = supabase.from('fsk_blog_posts').select(`
    ${select},
    cat:fsk_blog_cat(
        id,
        name,
        description,
        slug
    ),
    author:fsk_blog_author(
      id,
      name,
      username,
     avatar
     ) 
    `.toString())
      .eq('draft', false)
      .textSearch('fts', query)
      .order('created_at', { ascending: false })
      .range((page - 1) * perPege, page * perPege)
    const [tags, res] = await Promise.all([tagsDB, resDb])
    return preparePostResponse({
      tags,
      res,
      page,
      perPege
    })
  } catch (e) {
    return null
  }
}

export const inc_tags_count = async (tag_ids: number[]) => {
  try {
    await supabase.rpc('inc_blog_tag_count', { tags: tag_ids })
  } catch {
    // ignore
  }
}

export const dec_tags_count = async (tag_ids: number[]) => {
  try {
    await supabase.rpc('dec_blog_tag_count', { tags: tag_ids })
  } catch {
    // ignore
  }
}

export const rem_tag_from_posts = async (tag_id: number) => {
  try {
    await supabase.rpc('rem_blog_tag_post', { tag: tag_id })
  } catch {
    // ignore
  }
}