import { config } from '#lib/config/index.ts';
import type { IPost } from '#lib/types/post.ts';
import { sanitizeMetaDescription } from '#lib/utils/common/misc.ts';

function cleanInvalidXmlChars(input: string): string {
  if (!input) return '';

  return input
    .replace(new RegExp('[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F-\\x84\\x86-\\x9F]', 'g'), '')
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export const generateRssFeed = (
  posts: IPost[],
  buildDate: Date,
  page: number,
  options?: { totalPages?: number; hasNextPage?: boolean }
) => {
  const { totalPages, hasNextPage = false } = options || {};

  // Build pagination links
  const firstUrl = `${config.baseSiteUrl}/feed`;
  const prevUrl = page > 2 ? `${config.baseSiteUrl}/feed?paged=${page - 1}` : firstUrl;
  const nextUrl = `${config.baseSiteUrl}/feed?paged=${page + 1}`;
  const lastUrl = totalPages ? `${config.baseSiteUrl}/feed?paged=${totalPages}` : null;

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
  <link>${config.baseSiteUrl}${page > 1 ? '/page/' + page : ''}</link>
  <description>${config.siteIndexDescription}</description>
  <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
  <language>en-US</language>
  <sy:updatePeriod>hourly</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  <generator>SvelteKit</generator>

  <!-- Atom Self & Pagination Links (RFC 5005) -->
  <atom:link href="${config.baseSiteUrl}/feed${page > 1 ? '?paged=' + page : ''}" rel="self" type="application/rss+xml" />
  <atom:link href="${firstUrl}" rel="first" type="application/rss+xml" />
  ${page > 1 ? `<atom:link href="${prevUrl}" rel="previous" type="application/rss+xml" />` : ''}
  ${hasNextPage || (totalPages && page < totalPages) ? `<atom:link href="${nextUrl}" rel="next" type="application/rss+xml" />` : ''}
  ${lastUrl ? `<atom:link href="${lastUrl}" rel="last" type="application/rss+xml" />` : ''}

        <image>
            <url>${config.baseSiteUrl}/icon/favicon-32x32.png</url>
            <title>${config.siteIndexTitle}</title>
            <link>${config.baseSiteUrl}</link>
            <width>32</width>
            <height>32</height>
        </image> 
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        ${posts
          .map((post) => {
            const cleanTitle = cleanInvalidXmlChars(post.title);
            const cleanContent = cleanInvalidXmlChars(post.content);
            const cleanSeo = cleanInvalidXmlChars(post.seo_description);

            return `
            <item>
                <title>${cleanTitle}</title>
                <link>${config.baseSiteUrl}/${post.slug}</link>
                <dc:creator><![CDATA[${post?.author?.username ?? 'Admin'}]]></dc:creator>
                <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
                <category><![CDATA[${post.cat?.name ?? 'No Category'}]]></category>
                <guid>${config.baseSiteUrl}/${post.slug}</guid>
                <description><![CDATA[${sanitizeMetaDescription(cleanSeo || cleanContent || cleanTitle)}]]></description>
                <content:encoded><![CDATA[\n\n${cleanContent}\n]]></content:encoded>
                <comments>${config.baseSiteUrl}/${post.slug}/#respond</comments>
            </item>
            `;
          })
          .join('\n')}
    </channel>
</rss>
`;
};

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
<atom:link href="${config.baseSiteUrl}/feed${page > 1 ? '?paged=' + page : ''}" rel="self" type="application/rss+xml" />
<link>${config.baseSiteUrl}${page > 1 ? '/page/' + page : ''}</link>
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
`;
};
