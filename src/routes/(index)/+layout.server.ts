import type { LayoutServerLoad } from './$types';
import { getTagCloud, getGoodReadsData } from '$lib/utils/server/widgets';

export const load = (async (req) => {
   let theme
   const theme_cookie = req.cookies.get('theme_color')
   if(theme_cookie) {
        theme = theme_cookie
   } else {
        theme = 'dark'
   }

  const sideData = await Promise.all([getTagCloud(), getGoodReadsData()])
   
  return {
   sidebarData : {
     tagCloud: sideData?.[0],
     goodReads: sideData?.[1]
   },
    theme
  };
}) satisfies LayoutServerLoad;