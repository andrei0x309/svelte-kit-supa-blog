import { error } from '@sveltejs/kit';
import { makeTitle, appendToData } from '@/lib/utils/common'

const defaultError = {
  message: 'Resource not found',
  pageType: 'unknown'
}

const internalError = {
  message: 'Internal error',
  pageType: 'unknown'
}

export const checkData = (data: unknown, errorObj = defaultError ): Record<string, unknown> => {
    if(!data) {
      if(data === -1) {
        error(404, errorObj);
      }
      error(500, internalError);
    }
    return data as Record<string, unknown>
  }
    
  export const extractPage = (rest: string, errorObj = defaultError ) => {
    if(rest.includes('page/')) {
      const page = Number(rest.split('page/')[1].replace('/', ''))
      
      if (!Number.isInteger(page)) {
        error(404, errorObj);
      }

      if(page < 1) {
        error(404, errorObj);
      }
      return page
    }
    return 1
  }

export { error, makeTitle, appendToData }
