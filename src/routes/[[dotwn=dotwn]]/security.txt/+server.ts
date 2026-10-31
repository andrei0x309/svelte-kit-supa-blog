import { config } from '#/lib/config/index.ts'

const content = 
`
Contact: ${config?.contactFormLink ?? config.baseSiteUrl }
Expires: 2034-02-28T12:22:00.000Z
Preferred-Languages: en
`

import type { EntryGenerator, RequestHandler } from './$types';

export const entries: EntryGenerator = () => {
  return [{ dotwn: '.well-known' }];
};

export const prerender = true;

export const GET: RequestHandler = async () => {

  return new Response(content, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/json'
    },
    status: 200
  });
};
