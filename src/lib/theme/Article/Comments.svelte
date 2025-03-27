<script lang="ts">
import { theme as themeStore } from '@/stores/main'
import {onMount, onDestroy} from 'svelte'
import Giscus from '@giscus/svelte'
 
const darkTheme = 'noborder_dark'
const lightTheme = 'noborder_light'

let localTheme = $state($themeStore === 'dark' ? darkTheme : lightTheme)

let themeUnsub: () => void

onMount(() => {
  themeUnsub = themeStore.subscribe((theme) => {
        localTheme = theme === 'dark' ? darkTheme : lightTheme
    })
  })

  onDestroy(() => {
    themeUnsub?.()
  })
  

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
      theme={localTheme}
      lang="en"
      loading="lazy"
    />