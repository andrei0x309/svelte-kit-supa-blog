import { supabase } from '@/lib/node/supaClientFS'

export const loadCategories = async () => {
    const { data: categories, error } = await supabase
        .from('fsk_blog_cat')
        .select('*, posts:fsk_blog_posts(count)')
        .order('updated_at', { ascending: false })
    
    if (error) {
        return null
    }
    
    return categories
}

export const loadTags = async () => {
    const { data: tags, error } = await supabase
        .from('fsk_blog_tag')
        .select('*')
        .order('updated_at', { ascending: false })
    if (error) {
        return null
    }

    return tags
}

export const loadCatOrTag = async (id: string, type: 'cat' | 'tag') => {
    try {
        if(id) {
        let catOrTag
        if(type === 'cat') {
            catOrTag  = (await supabase.from('fsk_blog_cat').select('*').eq('id', id).single()).data
        } else if(type === 'tag') {
            catOrTag  = (await supabase.from('fsk_blog_tag').select('*').eq('id', id).single()).data
        }
        if(catOrTag) {
            return {
                catOrTag
            }
        }       
        }
        return {
            notFound: true
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export const getLoad = (type: 'cat' | 'tag' ) => {
return (async (req: any) => {
        return await loadCatOrTag(req.params.id, type)
    })
}
