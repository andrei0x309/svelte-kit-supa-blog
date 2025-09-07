import type { RequestHandler } from  './$types';
import { generatePaths } from '$lib/utils/server/sitemap'
import { config } from '$lib/config'
export const prerender = true;
 
const website =  config.baseSiteUrl

export const GET: RequestHandler = async () => {
  const pages = await generatePaths();
  const contnet = pages
  .map(
    (page) => `<url>
  <loc>${website}/${page.url}</loc>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority ?? ' 0.5'}</priority>
  </url>`
  )
  .join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${contnet}
    </urlset>`,

    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
      },
      status: 200
    });
}