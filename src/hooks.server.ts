import type { Handle } from '@sveltejs/kit';
import { getLangFromPath } from '@/lib/utils/server/lang'
import { redirect } from '@sveltejs/kit';
import { config } from './lib/config';

export const handle = (async ({ event, resolve }) => {
    const path = event.url.pathname.startsWith('/') ? event.url.pathname.slice(1) : event.url.pathname
    const hostname = event.request.headers.get('host') || ''
    if (hostname.startsWith('www.')) {
      return redirect(301, `${config.baseSiteUrl}${path}`, )
    } else if (['andrei.flashsoft.eu', 'andrei0x309.flashsoft.eu', 'bfsk.netlify.app'].includes(hostname)) {
      return redirect(301, `https://blog.flashsoft.eu/${path}`, )
    }

    const lang = getLangFromPath(path)
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', lang)
    });
  }) satisfies Handle;