import type { IPost } from '$lib/types/post'
import { schemas } from '$lib/types/post'
import truncate from "truncate-html"
import { config, schemaSocials } from '$lib/config'

export const getSchemaArticle = ( post: IPost ) => {
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

     switch (schema) {
            case schemas[0]:
                return {
                    "@type": "Article",
                    ...mainBody
                  }
            case schemas[1]:
                return {
                    "@type": "TechArticle",
                    ...mainBody
                    }
            case schemas[2]:
                return {
                    "@type": "NewsArticle",
                    ...mainBody
                    }
            case schemas[3]:
                return {
                    "@type": "BlogPosting",
                    ...mainBody
                    }
            default:
                return ''
     }
}

export const getSchemaWebPage = ( post: IPost ) => {
    return {
        "@type": "WebPage",
        "@id": `${config.baseSiteUrl}/${post.slug}#webpage`,
        "url": `${config.baseSiteUrl}/${post.slug}`,
        "name": post.title,
        "isPartOf": {
          "@id": `${config.baseSiteUrl}#website`
        },
        "primaryImageOfPage": {
          "@id": `${config.baseSiteUrl}/${post.slug}#primaryimage`
        },
        "datePublished": `${post.created_at}`,
        "dateModified": `${post.updated_at}`,
        "image": {
          "@id": `${config.baseSiteUrl}/${post.slug}#primaryimage`
        },
        "thumbnailUrl": `${post.feature_image}`,
        "breadcrumb": {
          "@id": `${config.baseSiteUrl}/${post.slug}#breadcrumb`
        },
        "inLanguage": !post.slug.includes('/') ? 'en-US' : post.slug.split('/')[0],
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [
                `${config.baseSiteUrl}/${post.slug}`
            ]
          },
          {
            "@type": "SearchAction",
            "target": `${config.baseSiteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        ]
      }
}

export const getSchemaBreadcrumb = ( post: IPost ) => {
    return {
        "@type": "BreadcrumbList",
        "@id": `${config.baseSiteUrl}/${post.slug}#breadcrumb`,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@id": `${config.baseSiteUrl}`,
                    "name": "Home"
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@id": `${config.baseSiteUrl}/${post.slug}`,
                    "name": post.title
                }
            }
        ]
    }
}

export const getSchemaImageObject = ( post: IPost ) => {
    return {
        "@type": "ImageObject",
        "@id": `${config.baseSiteUrl}/${post.slug}#primaryimage`,
        "inLanguage": !post.slug.includes('/') ? 'en-US' : post.slug.split('/')[0],
        "url": `${post.feature_image}`,
        "width": "1200",
        "height": "630"
        }
}

export const getSchemaOrganization = () => {
    return {
        "@type": "Organization",
        "@id": `${config.baseSiteUrl}#organization`,
        "name": config.siteIndexTitle,
        "url": `${config.baseSiteUrl}`,
        "sameAs": Object.values(schemaSocials).filter((social) => social !== ''),
        "logo": {
            "@type": "ImageObject",
            "@id": `${config.baseSiteUrl}#logo`,
            "inLanguage": "en-US",
            "url": `${config.baseSiteUrl}/icon/flashsoft-blog-512.png`,
            "caption": config.siteIndexTitle
        },
        "image": {
            "@id": `${config.baseSiteUrl}#logo`
        }
    }
}

export const getSchemaWebSite = () => {
    return {
        "@type": "WebSite",
        "@id": `${config.baseSiteUrl}#website`,
        "url": `${config.baseSiteUrl}`,
        "name": config.siteIndexTitle,
        "description": config.siteIndexDescription,
        "publisher": {
            "@id": `${config.baseSiteUrl}#organization`
        },
        "inLanguage": "en-US",
        "potentialAction": [
            {
                "@type": "SearchAction",
                "target": `${config.baseSiteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        ]
    }
}

export const getSchemaPerson = ( post: IPost ) => {
    return {
        "@type": "Person",
        "@id": `${config.baseSiteUrl}#person`,
        "name": post.author?.name ?? post.author?.username ?? 'Admin',
        "image": post.author?.avatar ?? '',
        "url": `${config.baseSiteUrl}/author/${post.author?.username}`,
        "sameAs": Object.values(schemaSocials).filter((social) => social !== ''),
    }
}


export const getFullSchema = (schemas : any[]) => {
    return `<script type="application/ld+json">\n
    {
        "@context": "https://schema.org",
        "@graph": ${JSON.stringify(schemas, null, 2)}
    }
    \n</script>`
}

export const getIndexSchema = () => {
    const schemas = []
    schemas.push(getSchemaWebSite())
    schemas.push(getSchemaOrganization())
    return getFullSchema(schemas)
}

export const getPostSchema = ( post: IPost ) => {
    const schemas = []
    schemas.push(getSchemaArticle(post))
    schemas.push(getSchemaWebPage(post))
    schemas.push(getSchemaBreadcrumb(post))
    schemas.push(getSchemaImageObject(post))
    schemas.push(getSchemaOrganization())
    schemas.push(getSchemaPerson(post))
    return getFullSchema(schemas)
}

