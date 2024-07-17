import type { LayoutServerLoad } from './$types';
import { generate_tag_cloud } from '$lib/utils/server/widgets';

export const load = (async (req) => {
   let theme
   const theme_cookie = req.cookies.get('theme_color')
   if(theme_cookie) {
        theme = theme_cookie
   } else {
        theme = 'dark'
   }
  return {
   sidebarData : {
     tag_cloud: await generate_tag_cloud()
   },
    theme
  };
}) satisfies LayoutServerLoad;