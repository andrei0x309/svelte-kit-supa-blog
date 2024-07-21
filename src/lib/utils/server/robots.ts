
import { config } from '@/lib/config'

const baseData = `User-agent: *
Disallow: 
Disallow: /admin/
Disallow: /login/
Disallow: /preview/`

export const renderRobots = () => {
    const sitemap = `Sitemap: ${config.baseSiteUrl}/sitemap.xml`
    return baseData + '\n\n' + sitemap
}