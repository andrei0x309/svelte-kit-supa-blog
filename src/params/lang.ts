import type { ParamMatcher } from '@sveltejs/kit';
 
export const match = ((param) => {
  return /^(ro)$/.test(param);
}) satisfies ParamMatcher;
