import type { ParamMatcher } from '@sveltejs/kit';
 
export const match = ((param) => {
  return /^(\.well-known)$/.test(param);
}) satisfies ParamMatcher;
