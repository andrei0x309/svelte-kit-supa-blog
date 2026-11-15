import { widgets } from '#/lib/config/index.ts';
import { supabase } from '#/lib/node/supaClientFS.ts';
import { getDiffFromNow, shuffleFY } from '#/lib/utils/common/misc.ts';
import { loadTags } from '#/lib/utils/db/catOrTag.ts';

const generateTagCloud = async () => {
  const excludedTags = widgets.tagCloud.excludedTags;

  const config = {
    smallest: 8,
    largest: 22,
    unit: 'pt'
  };

  const tags = await loadTags();

  if (!tags) {
    return null;
  }

  const counts = tags.map((tag) => {
    if (tag.count) {
      return tag.count;
    }
    return 0;
  });

  const min_count = Math.min(...counts);

  let spread = Math.max(...counts) - min_count;
  if (spread <= 0) {
    spread = 1;
  }
  let font_spread = config.largest - config.smallest;
  if (font_spread < 0) {
    font_spread = 1;
  }
  const font_step = font_spread / spread;

  const tag_cloud = tags.map((tag) => {
    
    if (excludedTags.includes(tag.slug)) {
      return '';
    }

    return `<a href="/tag/${tag.slug}" style="font-size: ${config.smallest + ((tag?.count ?? 0) - min_count) * font_step}${config.unit}"
        title = "Tag: ${tag.name}"
        aria-label = "View ${tag.count} post${tag.count === 1 ? '' : 's'} for ${tag.name}"
        >
        ${tag.name}
        </a>`;
  });

  shuffleFY(tag_cloud);
  return tag_cloud.join('\n');
};

const saveWidgetContent = async (name: string, value: string | null | undefined) => {
  if (value == null) {
    throw new Error(`Unable to generate ${name} content.`);
  }

  const { error } = await supabase.from('fsk_blog_store').upsert({
    name,
    value,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Unable to save ${name} content: ${error.message}`);
  }

  return value;
};

export const getTagCloud = async (forceUpdate = false) => {

  if (forceUpdate) {
    return saveWidgetContent('tagCloud', await generateTagCloud());
  }

  const { data } = await supabase.from('fsk_blog_store').select('*').eq('name', 'tagCloud').single();
  if (!data) {
    const tagCloud = await generateTagCloud();
    supabase.from('fsk_blog_store').upsert({
      name: 'tagCloud',
      value: tagCloud,
      updated_at: new Date().toISOString()
    });
    return tagCloud;
  } else {
    if (getDiffFromNow(data.updated_at) > 3) {
      generateTagCloud().then((res) => {
        supabase
          .from('fsk_blog_store')
          .upsert({ name: 'tagCloud', value: res, updated_at: new Date().toISOString() })
          .then((res) => {
            console.info('Update tagCloud: ', res);
          });
      });
    }
  }
  return data.value;
};

export const createGoodReadsData = async () => {
  const req = await fetch(
    widgets.goodReads.contentUrl
  );
  const res = await req.text();
  let widget = res.match(/[^<](<.*)'/im)?.[1];
  widget = widget?.replace(/\\\//g, '/');
  widget = widget?.replace(/\\n/g, '');
  widget = widget?.replace(/\\"/g, '"');
  widget = widget?.replace(/<center>[\s\S]*?<\/center>/g, '');
  widget = widget?.replace(/border="0"/g, '');
  widget = widget?.replace(/\\'/g, "'");
  widget = widget?.replace(/<br[^>]*>/g, '');
  widget = widget?.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  widget = widget?.replace(
    /src="(https:\/\/(?:i|s)\.gr-assets\.com\/[^"]+)"/g,
    (_match, p1) => `src="/api/proxy-image?url=${encodeURIComponent(p1)}"`
  );
  widget = widget?.replace(/(gr_custom_book_container.*?<img)/g, '$1 width="39" height="60" ');
  widget = widget?.replace(/<span.*?staticStars.*?span>/g, (match) =>
    match.replace(/<img/gim, '<img width="15" height="15"')
  );
  widget = widget?.replace(/rel="nofollow"/gm, 'rel="nofollow external"');
  widget = widget?.replace(
    /<div class="gr_custom_author_[^"]*">[\s\S]*?<\/div>/g,
    (authorDiv) => authorDiv.replace(/<a[^>]*>([\s\S]*?)<\/a>/g, '<b>$1</b>')
  );
  return widget;
};

export const getGoodReadsData = async (forceUpdate = false) => {
  if (forceUpdate) {
    return saveWidgetContent('goodreads', await createGoodReadsData());
  }
  const { data } = await supabase.from('fsk_blog_store').select('*').eq('name', 'goodreads').single();
  if (!data) {
    const widget = await createGoodReadsData();
    supabase.from('fsk_blog_store').upsert({ name: 'goodreads', value: widget, updated_at: new Date().toISOString() });
    return widget;
  } else {
    if (getDiffFromNow(data.updated_at) > 6) {
      createGoodReadsData().then((res) => {
        supabase
          .from('fsk_blog_store')
          .upsert({ name: 'goodreads', value: res, updated_at: new Date().toISOString() })
          .then((res) => {
            console.info('Update goodreads widget: ', res);
          });
      });
    }
  }
  return data.value;
};

// createGoodReadsData().then((res) => {
//     console.log(res);
// })
