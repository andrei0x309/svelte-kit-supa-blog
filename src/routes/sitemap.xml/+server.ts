import { config } from '#lib/config/index.ts';
import { generatePaths } from '#lib/utils/server/sitemap.ts';
import type { RequestHandler } from './$types';

const website = config.baseSiteUrl;

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: RequestHandler = async () => {
  const pages = await generatePaths();
  const content = pages
    .map((page) => {
      const path = page.url.split('/').map(encodeURIComponent).join('/');
      const location = new URL(path, `${website.replace(/\/+$/, '')}/`).href;
      return `<url>
  <loc>${escapeXml(location)}</loc>
  ${page.lastmod ? `<lastmod>${escapeXml(page.lastmod)}</lastmod>` : ''}
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${content}
	</urlset>`,
    {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml; charset=utf-8'
      },
      status: 200
    }
  );
};
