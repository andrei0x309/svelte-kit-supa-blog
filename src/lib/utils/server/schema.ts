import type { IPost } from '$lib/types/post'
import { schemas } from '$lib/types/post'
import truncate from "truncate-html"

export const getSchemaContent = ( post: IPost ) => {
    if(!post) return ''
    const { schema } = post
     const mainBody = {
        "author": post.author?.name ?? post.author?.username ?? 'Admin',
        "name":  post.title,
        "headline": post.title,
        "image": post.feature_image,
        "datePublished": post.created_at,
        "dateModified": post.updated_at,
        "description": post.seo_description ?? truncate(post.content, 160, { byWords: true, ellipsis: '...', stripTags: true }),
     }
     const addLdJson = (content: string) => `<script type="application/ld+json">\n${content}\n</script>`

     switch (schema) {
            case schemas[0]:
                return addLdJson(JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    ...mainBody
                  }))
            case schemas[1]:
                return addLdJson(JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    ...mainBody
                    }))
            case schemas[2]:
                return addLdJson(JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    ...mainBody
                    }))
            case schemas[3]:
                return addLdJson(JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    ...mainBody
                    }))
            default:
                return ''
     }
}