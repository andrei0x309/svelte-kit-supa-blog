import { error } from '@sveltejs/kit';
import { makeTitle, appendToData } from '@/lib/utils/common'

export const checkData = (data: unknown): Record<string, unknown> => {
    if(!data) {
      if(data === -1) {
        throw error(404, 'Not found')
      }
      throw error(500, 'Error loading data')
    }
    return data as Record<string, unknown>
  }
    
  export const extractPage = (rest: string) => {
    if(rest.includes('page/')) {
      const page = Number(rest.split('page/')[1].replace('/', ''))
      if(page < 1) {
        throw error(404, 'Not found')
      }
      return page
    }
    return 1
  }

export { error, makeTitle, appendToData }
