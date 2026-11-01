import { supabase } from '#/lib/node/supaClientFS.ts';
import type { ICatTag } from '#/lib/types/catTag.ts';

export const loadCategories = async () => {
  const { data: categories, error } = await supabase.from('fsk_blog_cat').select('*, posts:fsk_blog_posts(count)').order('updated_at', { ascending: false });

  if (error) {
    return null;
  }

  return categories as ICatTag[];
};

export const loadTags = async () => {
  const { data: tags, error } = await supabase.from('fsk_blog_tag').select('*').order('updated_at', { ascending: false });
  if (error) {
    return null;
  }

  return tags as ICatTag[];
};

export const loadCatOrTag = async (id: string, type: 'cat' | 'tag') => {
  try {
    if (id) {
      let catOrTag = { id } as unknown as ICatTag
      let data: ICatTag | null = null
      if (type === 'cat') {
        data = (await supabase.from('fsk_blog_cat').select('*').eq('id', id).single())?.data
        catOrTag = { ...catOrTag, ...(data ?? {} ) } as ICatTag;
      } else if (type === 'tag') {
        data = (await supabase.from('fsk_blog_tag').select('*').eq('id', id).single())?.data
        catOrTag = { ...catOrTag, ...(data ?? {} ) } as ICatTag;
      }
      if (data) {
        return {
          catOrTag,
          notFound: false
        };
      }
      return {
        catOrTag,
        notFound: true
      }
    }
    return {
      notFound: true
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

export const getLoad = (type: 'cat' | 'tag') => {
  return async (req: any) => {
    return await loadCatOrTag(req.params.id, type);
  };
};
