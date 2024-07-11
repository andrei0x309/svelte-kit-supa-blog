import type { ParamMatcher } from '@sveltejs/kit';
 
export const match = ((param) => {
  return /^page$/.test(param);
}) satisfies ParamMatcher;
