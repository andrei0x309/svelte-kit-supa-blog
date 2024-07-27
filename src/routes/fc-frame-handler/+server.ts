import type { RequestHandler } from  './$types';
import type { T_FRAME_API_BODY } from '$lib/types/fc-frame-post'
import { getFrameServerResponse } from '$lib/utils/server/fc-frame'

export const POST: RequestHandler = async ( { request } ) => {
    const queryParams = new URL(request.url).searchParams
    const page = queryParams.get('page') || 'default'
    const data = await request.json() as T_FRAME_API_BODY
    
    return getFrameServerResponse(page, data)

  }
