import type { Handle } from '@sveltejs/kit';
import { getLangFromPath } from '@/lib/utils/server/lang'

export const handle = (async ({ event, resolve }) => {
    const path = event.url.pathname.startsWith('/') ? event.url.pathname.slice(1) : event.url.pathname
    const lang = getLangFromPath(path)
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', lang)
    });
  }) satisfies Handle;