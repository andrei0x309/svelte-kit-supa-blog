import { error } from '@sveltejs/kit';
import { appendToData, makeTitle } from '#/lib/utils/common.ts';

const defaultError = {
  message: 'Resource not found'
};

const internalError = {
  message: 'Internal error'
};

export const checkData = (data: unknown, errorMessage = defaultError.message): Record<string, unknown> => {
  if (!data) {
    if (data === -1) {
      error(404, errorMessage);
    }
    error(500, internalError.message);
  }
  return data as Record<string, unknown>;
};

export const extractPage = (rest: string, errorMessage = defaultError.message) => {
  if (rest.includes('page/')) {
    const page = Number(rest.split('page/')[1].replace('/', ''));

    if (!Number.isInteger(page)) {
      error(404, errorMessage);
    }

    if (page < 1) {
      error(404, errorMessage);
    }
    return page;
  }
  return 1;
};

export { appendToData, error, makeTitle };
