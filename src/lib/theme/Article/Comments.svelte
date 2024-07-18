<script lang="ts">
import { config } from '$lib/config'
import { theme } from '@/stores/main'

export let slug = ''

const modules = []
if(config.echoCommentsEnabled) modules.push('comment')
if(config.echoTipsEnabled) modules.push('tip')
const modulesString = modules.length > 1 ? modules.join('%2C') : modules[0]
const target_uri = encodeURIComponent(`${config.baseSiteUrl}/${slug}`)

 
</script>

<iframe 
loading="lazy"
width="100%"
class="min-h-96"
src="{`https://embed.0xecho.com.ipns.page?color-theme=${$theme}&desc=&has-h-padding=true&has-v-padding=true&modules=${modulesString}&receiver=${config.echoReciverAddress}&target_uri=${target_uri}`}" frameborder="0">
</iframe>