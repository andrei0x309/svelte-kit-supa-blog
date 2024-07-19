import type { RequestHandler } from  './$types';
import { getGoodReadsData, getTagCloud  } from '$lib/utils/server/widgets'
import { SECRET_CRON_PASS } from '$env/static/private'

const cronFnToExec = [getGoodReadsData, getTagCloud ]

export const GET: RequestHandler = async ({ url}) => {
    const { searchParams } = new URL(url.href)
    const pass = searchParams.get('pass')
    if(!pass || pass !== SECRET_CRON_PASS) {
      return new Response(`Cron job not executed missing password`, {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'application/text'
        },
      }
      );
    }
    
    await Promise.all(cronFnToExec.map(fn => fn()))
    return new Response(`Cron job executed`,

    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/text'
      },
      status: 200
    });
}
