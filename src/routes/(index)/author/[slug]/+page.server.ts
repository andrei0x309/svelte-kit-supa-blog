// import { getSchemaContent } from '#/lib/utils/server/schema'
// import type { ICurrentUser } from '#lib/types/user.ts'

import truncate from 'truncate-html';
import { supabase } from '#/lib/node/supaClientFS.ts';
import { appendToData, error } from '#/lib/utils/page.ts';
import { config } from '#lib/config/index.ts';
import { sanitizeMetaDescription } from '#lib/utils/common/misc.ts';
import type { PageServerLoad } from './$types';

const defaultError = {
  message: 'Author not found'
};

export const load: PageServerLoad = async (req) => {
  const slug = req.params.slug;

  if (!slug) {
    throw error(404, defaultError.message);
  }
  const user = (await supabase.from('fsk_blog_author').select('*').eq('username', slug).single()).data;
  if (!user) {
    throw error(404, defaultError.message);
  }

  const { data: posts } = 
    await supabase
      .from('fsk_blog_posts')
      .select(
        `
      slug,
      title,
      feature_image,
      feature_image_alt,
      created_at,
      content
      `
      )
      .eq('draft', false)
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

  const postsWithContent = posts?.map((post) => {
    return {
      ...post,
      content: truncate(post.content, 120, { stripTags: true })
    };
  });

  const fallBackDescription = sanitizeMetaDescription(user.description) || 'Desciption is missing | ' + config.siteName;

  return appendToData(
    { res: user, posts: postsWithContent ?? [] },
    { pageTitle: user?.username ? 'Author | ' + user.username : 'Author | ' + config.siteName, pageDescription: fallBackDescription }
  );
};
