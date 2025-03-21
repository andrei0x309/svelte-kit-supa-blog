
// This file contains the configuration for the site. You can change the values here to customize the site.
export const config = {
    // Site Information
    defaultThemeMode: 'dark',
    siteName: 'blog.flashsoft.eu',
    siteIndexTitle: 'Blog | flashsoft.eu',
    siteIndexDescription: 'Blog | flashsoft.eu articles from andrei0x309 about projects, web development, programming, web3, and more.',
    baseSiteUrl: 'https://blog.flashsoft.eu',
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
    farcasterFrameEnabled: true,
    farcasterDonateAddress: '0x50cca5ed8b4455fbe316785269fc82500b67fd48',
    // Publish to IPFS - requires Appelion KEY
    enableAppelionIpfs: true,
    // Analytics Settings - Google
    enableGoogleAnalytics: true,
    googleAnalyticsId: 'G-0TYDTZGHS4',
    // Analytics Settings - Cloudflare
    enableCloudfareAnalytics: true,
    cloudfareAnalyticsToken: 'd9f2b',
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
}

// Use empty string if you don't want to include a social link
export const schemaSocials = {
    facebook: '',
    linkedin: '',
    twitter: 'https://twitter.com/andrei0x309',
    instagram: 'https://www.instagram.com/andrei0x309_',
    youtube: 'https://www.youtube.com/@andrei0x309',
    github: 'https://github.com/andrei0x309',
    gitlab: 'https://gitlab.com/andrei0x309',
    stackoverflow: 'https://stackoverflow.com/users/4354506/andrei-o',
    twitch: 'https://www.twitch.tv/andrei0x309',
    reddit: 'https://www.reddit.com/user/andrei0x309',
    mirror: 'https://mirror.xyz/andrei0x309.eth',
    discord: 'https://discordhub.com/profile/556064803203055616',
    telegram: 'https://t.me/andrei0x309',
    tiktok: 'https://www.tiktok.com/@andrei0x309',
    pinterest: 'https://www.pinterest.com/andrei0x309',
    spotify: 'https://open.spotify.com/user/31j4le3alu4ezqp3ymyroyt5vk7y',
    lens: 'https://hey.xyz/u/andrei0x309',
    warpcast: 'https://warpcast.com/andrei0x309',
    yuplive: 'https://yup-live.pages.dev/profile/andreix155xx/feed',
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
    bluesky: '',
}
