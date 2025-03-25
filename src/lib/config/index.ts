
// This file contains the configuration for the site. You can change the values here to customize the site.
export const config = {
    // Site Information
    defaultThemeMode: 'dark',
    siteName: 'blog.flashsoft.eu',
    siteIndexTitle: 'Blog | flashsoft.eu',
    siteIndexDescription: 'Blog | flashsoft.eu articles from andrei0x309 about projects, web development, programming, web3, and more.',
    baseSiteUrl: 'https://blog.flashsoft.eu',
    devBaseUrl: 'https://tun-5512.flashsoft.eu',
    tipMeName: 'andrei0x309',
    tipKoFiLink: 'https://ko-fi.com/andrei0x309',
    tipNowPaymentsLink: 'https://nowpayments.io/donation/andrei0x309',
    // Post Settings
    excerptSizeInChars: 450,
    indexPostsPerPage: 4,
    relatedPostsEnabled: true,
    signatureDisplayEnabled: true, // Enables EVM signature display
    // Giscus commenting system
    giscusCommentsEnabled: true,
    // Requres MarketCap API KEY for eth price for donnate
    farcasterFrameV2Enabled: true,
    farcasterFollowButtonEnabled: true,
    farcasterV2FollowFid: 1791,
    // Publish to IPFS - requires Appelion KEY
    enableAppelionIpfs: true,
    // Analytics Settings - Google
    enableGoogleAnalytics: false,
    googleAnalyticsId: 'G-0TYDTZGHS4',
    // Analytics Settings - Cloudflare
    enableCloudflareAnalytics: true,
    cloudflareAnalyticsToken: 'd9f2b',
    // Localization Settings
    supportedLanguages: [ 'en', 'ro' ],
    // Author Settings
    authorPageEnabled: true,
    footerSocialIcons: {
        github: true,
        pinterest: true,
        twitter: true,
        tiktok: true,
    },
    // -1 to disable the feature, 0 to show all links, any other number to show that number of links
    numLinksForAuthor: 0,
    // IS_DEV_ENABLED mainly used to expose a public dev URL for testing
    IS_DEV_ENABLED: true,
}

// Use empty string if you don't want to include a social link
export const schemaSocials = {
    facebook: '',
    linkedin: '',
    GitHub: 'https://github.com/andrei0x309',
    GoogleDev: 'https://g.dev/andrei0x309',
    GitLab: 'https://gitlab.com/andrei0x309',
    X: 'https://x.com/andrei0x309',
    GoodReads: 'https://www.goodreads.com/user/show/52338687-andrei',
    Bluesky: 'https://bsky.app/profile/andrei0x309.flashsoft.eu',
    Instagram: 'https://www.instagram.com/andrei0x309_',
    Youtube: 'https://www.youtube.com/@andrei0x309',
    StackOverflow: 'https://stackoverflow.com/users/4354506/andrei-o',
    Twitch: 'https://www.twitch.tv/andrei0x309',
    Reddit: 'https://www.reddit.com/user/andrei0x309',
    Mirror: 'https://mirror.xyz/andrei0x309.eth',
    Discord: 'https://discordhub.com/profile/556064803203055616',
    Telegram: 'https://t.me/andrei0x309',
    Tiktok: 'https://www.tiktok.com/@andrei0x309',
    Pinterest: 'https://www.pinterest.com/andrei0x309',
    Spotify: 'https://open.spotify.com/user/31j4le3alu4ezqp3ymyroyt5vk7y',
    Lens: 'https://hey.xyz/u/andrei0x309',
    Warpcast: 'https://warpcast.com/andrei0x309',
    soundcloud: '',
    vimeo: '',
    medium: '',
    quora: '',
    devto: '',
    snapchat: '',
    hackernews: '',
    behance: '',
    dribbble: '',
    threads: '',
}

export const excludeSocials = [
    'Instagram',
]

export const customLinks = {
    'Projects': 'https://flashsoft.eu/projects',
    'Courses': 'https://flashsoft.eu/certs',
}
