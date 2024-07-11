import type { LayoutServerLoad } from './$types';
 
export const load = (async (req) => {
   let theme
   const theme_cookie = req.cookies.get('theme_color')
   if(theme_cookie) {
        theme = theme_cookie
   } else {
        theme = 'dark'
   }

  return {
    theme
  };
}) satisfies LayoutServerLoad;