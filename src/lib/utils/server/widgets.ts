import { loadTags } from  '@/lib/utils/db/catOrTag'
import { shuffleFY } from '@/lib/utils/server/misc'

export const generate_tag_cloud = async () => {
    
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

    
    
