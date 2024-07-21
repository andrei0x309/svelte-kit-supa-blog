import type { RequestHandler } from  './$types';
import { renderRobots } from '$lib/utils/server/robots'
export const prerender = true;

export const GET: RequestHandler = async () => {
   return new Response(renderRobots(), {
        headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'text/plain'
        },
        status: 200
    });
}