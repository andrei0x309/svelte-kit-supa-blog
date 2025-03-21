<script lang="ts">
import { theme as themeStore } from '@/stores/main'
import Giscus from '@giscus/svelte'
 
const darkTheme = 'noborder_dark'
const lightTheme = 'noborder_light'
 
</script>

<Giscus
      id="comments"
      repo="andrei0x309/svelte-kit-supa-blog"
      repoId="R_kgDOMS_bGQ"
      category="Announcements"
      categoryId="DIC_kwDOMS_bGc4CoN8P"
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={$themeStore === 'dark' ? darkTheme : lightTheme}
      lang="en"
      loading="lazy"
    />