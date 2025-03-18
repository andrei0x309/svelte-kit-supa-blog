<script lang="ts">
import { config } from '$lib/config'
import { theme } from '@/stores/main'

	interface Props {
		slug?: string;
	}

	let { slug = '' }: Props = $props();

const modules = []
if(config.echoCommentsEnabled) modules.push('comment')
if(config.echoTipsEnabled) modules.push('tip')
const modulesString = modules.length > 1 ? modules.join('%2C') : modules[0]
const target_uri = encodeURIComponent(`${config.baseSiteUrl}/${slug}`)

 
</script>

<iframe 
title="Comments"
loading="lazy"
width="100%"
class="min-h-96"
src="{`https://widget.0xecho.com?color-theme=${$theme}&desc=&has-h-padding=true&has-v-padding=true&modules=${modulesString}&receiver=${config.echoReciverAddress}&target_uri=${target_uri}`}" frameborder="0">
</iframe>