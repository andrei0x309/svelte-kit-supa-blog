import { config } from '$lib/config';
import truncate from "truncate-html";
import type { IPost } from '$lib/types/post'

function cleanInvalidXmlChars(input: string) {
    const enc = new TextEncoder().encode(input);
    const filterOut = [0x1B, 0x20, 0x61, 0x20]
    const filtered = enc.filter((x) => !filterOut.includes(x));
    return new TextDecoder().decode(filtered);
}


export const generateRssFeed = (posts: IPost[], buildDate: Date, page: number) => {
return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	>
    <channel>
	<title>${config.siteIndexTitle}</title>
    <atom:link href="${config.baseSiteUrl}/feed${page > 1 ? '?paged='+page : ''}" rel="self" type="application/rss+xml" />
	<link>${config.baseSiteUrl}${page > 1 ? '/page/'+ page : ''}</link>
	<description>${config.siteIndexDescription}</description>
	<lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
	<language>en-US</language>
	<sy:updatePeriod>
	hourly	</sy:updatePeriod>
	<sy:updateFrequency>
	1	</sy:updateFrequency>
	<generator>SvelteKit</generator>

        <image>
            <url>${config.baseSiteUrl}/icon/favicon-32x32.png</url>
            <title>${config.siteIndexTitle}</title>
            <link>${config.baseSiteUrl}</link>
            <width>32</width>
            <height>32</height>
        </image> 
        <generator>SvelteKit</generator>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        ${posts
        .map((post) => {
            post.title = cleanInvalidXmlChars(post.title);
            post.content = cleanInvalidXmlChars(post.content);
            post.seo_description = cleanInvalidXmlChars(post.seo_description);
            return post;
        })
        .map((post) => {
            return `
            <item>
                <title>${post.title}</title>
                <link>${config.baseSiteUrl}/${post.slug}</link>
                <dc:creator><![CDATA[${post?.author?.username}]]></dc:creator>
                <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
                <category><![CDATA[${post.cat?.name ?? 'No Category'}]]></category>
                <guid>${config.baseSiteUrl}/${post.slug}</guid>
                <description><![CDATA[${ post?.seo_description || truncate(post?.content, 160, { stripTags: true }) || post.title   }]]></description>
                <content:encoded><![CDATA[\n\n${post?.content}\n]]></content:encoded>
                <comments>${config.baseSiteUrl}/${post.slug}/#respond</comments>
            </item>
            `
        }).join('\n')}
    </channel>
</rss>
`
}

export const generateRssNotFound = (buildDate: Date, page: number) => {

return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/"
xmlns:wfw="http://wellformedweb.org/CommentAPI/"
xmlns:dc="http://purl.org/dc/elements/1.1/"
xmlns:atom="http://www.w3.org/2005/Atom"
xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
<channel>
<title>404 NOT FOUND ${config.siteIndexTitle}</title>
<atom:link href="${config.baseSiteUrl}/feed${page > 1 ? '?paged='+page : ''}" rel="self" type="application/rss+xml" />
<link>${config.baseSiteUrl}${page > 1 ? '/page/'+ page : ''}</link>
<description>${config.siteIndexDescription}</description>
<lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
<language>en-US</language>
<sy:updatePeriod>
hourly	</sy:updatePeriod>
<sy:updateFrequency>
1	</sy:updateFrequency>
<generator>SvelteKit</generator>

    <image>
        <url>${config.baseSiteUrl}/icon/favicon-32x32.png</url>
        <title>${config.siteIndexTitle}</title>
        <link>${config.baseSiteUrl}</link>
        <width>32</width>
        <height>32</height>
    </image> 
    <generator>SvelteKit</generator>
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
</channel>
</rss>
`
}