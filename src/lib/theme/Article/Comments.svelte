<script lang="ts">
import { config } from '$lib/config'
import { theme } from '@/stores/main'
import Giscus from '@giscus/svelte'

	interface Props {
		slug?: string;
	}

	let { slug = '' }: Props = $props();

const modules = []

const darkTheme = 'noborder_dark'
const lightTheme = 'noborder_light'
 

</script>

<Giscus
      id="comments"
      repo="andrei0x309/svelte-kit-supa-blog"
      repoId="R_kgDOMS_bGQ="
      category="Announcements"
      categoryId="DIC_kwDOMS_bGc4CoN8P"
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="noborder_dark"
      lang="en"
      loading="lazy"
    />