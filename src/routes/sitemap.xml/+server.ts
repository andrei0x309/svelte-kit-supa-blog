import type { RequestHandler } from  './$types';

export const prerender = true;
 
const website = 'https://flashsoft.eu';

const pages = [
	{
		url: '',
		priority: 0.8
	},
	{
		url: 'mypage'
	}
];


export const GET: RequestHandler = async () => {
  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
      .map(
        (page) => `<url>
			<loc>${website}/${page.url}</loc>
			<changefreq>monthly</changefreq>
			<priority>${page.priority ?? 0.5}</priority>
		  </url>`
      )
      .join('')}
	</urlset>`,

    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
      },
      status: 200
    });
}