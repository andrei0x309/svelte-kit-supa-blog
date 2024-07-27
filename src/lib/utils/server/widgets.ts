import { loadTags } from  '@/lib/utils/db/catOrTag'
import { shuffleFY } from '@/lib/utils/server/misc'
import { supabase } from '@/lib/node/supaClientFS'

const generateTagCloud = async () => {

    const config = {
        smallest: 8,
        largest: 22,
        unit: 'pt',
    }

    const tags = await loadTags()

    if(!tags) {
        return null
    }

    const counts = tags.map( ( tag ) => tag.count );
    const min_count = Math.min( ...counts );
    let spread = Math.max( ...counts ) - min_count;
    if ( spread <= 0 ) {
        spread = 1;
    }
    let font_spread = config.largest - config.smallest;
    if ( font_spread < 0 ) {
        font_spread = 1;
    }
    const font_step = font_spread / spread;

    const tag_cloud = tags.map( ( tag ) => {
        return `<a href="/tag/${tag.slug}" style="font-size: ${config.smallest + ( ( tag.count - min_count ) * font_step )}${config.unit}"
        title = "${tag.count} post${tag.count === 1 ? '' : 's'}"
        aria-label = "${tag.count} post${tag.count === 1 ? '' : 's'}"
        >
        ${tag.name}
        </a>`
    })

    shuffleFY(tag_cloud)
    return tag_cloud.join('\n')
}

export const getTagCloud = async () => {
    const { data } = await supabase
    .from('fsk_blog_store')
    .select('*')
    .eq('name', 'tagCloud')
    .single()
    if(!data) {
        const tagCloud = await generateTagCloud()
        supabase.from('fsk_blog_store').upsert(
            {
                name: 'tagCloud',
                value: tagCloud,
                updated_at: new Date().toISOString()
            }
        ).then((res) => {
            console.log("Operation result: ", res)
        })
        return tagCloud
    } else {
        const date = new Date(data.updated_at)
        const now = new Date()
        const diff = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))
        if(diffDays > 3) {
                generateTagCloud().then((res) => {
                supabase.from('fsk_blog_store').upsert( { name: 'tagCloud', value: res, updated_at: new Date().toISOString() }).then((res) => {
                    console.log("Operation result: ", res)
                    })
                })
                
            }
        }
        return data.value
    }

export const createGoodReadsData = async () => {
    const req = await fetch(`https://www.goodreads.com/review/custom_widget/52338687.Andrei's%20bookshelf:%20read?cover_position=left&cover_size=small&num_books=4&order=d&shelf=read&show_author=1&show_cover=1&show_rating=1&show_review=1&show_tags=1&show_title=1&sort=date_added&widget_bg_color=FFFFFF&widget_bg_transparent=&widget_border_width=1&widget_id=1678062343&widget_text_color=000000&widget_title_size=medium&widget_width=medium`)
    const res = await req.text()
    let widget = res.match(/[^<](<.*)'/mi)?.[1]
    widget = widget?.replace(/\\\//g, '/');
    widget = widget?.replace(/\\n/g, '');
    widget = widget?.replace(/\\"/g, '"');
    widget = widget?.replace(/<center>[^\x07]+center>/g, '');
    widget = widget?.replace(/border="0"/g, '');
    widget = widget?.replace(/\\'/g, "'");
    widget = widget?.replace(/<br[^\x07]+</g, '<');
    widget = widget?.replace(/<noscript>[^\x07]+noscript>/g, '');
    widget = widget?.replace(/(gr_custom_book_container.*?<img)/g, '$1 width="39" height="60" ');
    widget = widget?.replace(/<span.*?staticStars.*?span>/g, (match) => match.replace(/<img/gmi, '<img width="15" height="15"'));
    widget = widget?.replace(/rel="nofollow"/gm, 'rel="nofollow external"')
    return widget
}

export const getGoodReadsData = async () => {
    const { data } = await supabase
        .from('fsk_blog_store')
        .select('*')
        .eq('name', 'goodreads')
        .single()
    if(!data) {
        const widget = await createGoodReadsData()
        supabase.from('fsk_blog_store').upsert( { name: 'goodreads', value: widget, updated_at: new Date().toISOString() })
        return widget
    } else {
        const date = new Date(data.updated_at)
        const now = new Date()
        const diff = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))
        if(diffDays > 7) {
                createGoodReadsData().then((res) => {
                supabase.from('fsk_blog_store').upsert( { name: 'goodreads', value: res, updated_at: new Date().toISOString() }).then((res) => {
                    console.log("Operation result: ", res)
                })
            })
            }
        }
        return data.value
    }


// createGoodReadsData().then((res) => {
//     console.log(res);
// })

 