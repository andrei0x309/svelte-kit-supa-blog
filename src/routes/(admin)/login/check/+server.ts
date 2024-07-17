import { supabase } from '@/lib/node/supaClientFS'
import { getSha256 } from '@/lib/utils/server/crypto'

import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
 
export const POST: RequestHandler = (async ({ request }) => {
    try {
  const {
      username,
      password,
  } = await request.json()

    if(!username || !password) {
        return json({error: 'Missing username or password'}, {status: 400})
    }
    
    const user = (await supabase.from('fsk_blog_author')
    .select('username, password_hash')
    .eq('username', username).single()).data
    if(!user) {
        return json({error: 'User not found'}, {status: 404})
    }
    const hash = await getSha256(password);

    if(hash !== user.password_hash) {
        return json({error: 'Wrong password'}, {status: 401})
    }
    
    return json({data: 'ok', hash})

    } catch (e) {
      console.log(e)
      return json({error: 'Internal Server Error'}, {status: 500})
    }
}) satisfies RequestHandler;