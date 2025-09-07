import { config } from './index'
const IS_DEV_ENABLED = config.IS_DEV_ENABLED
import type { TriggerConfig } from '$lib/types/farcaster-frame-v2'

export const FCConfig = {
    JFS: { // JSON Farcaster Signature for ./well-known account association
        accountAssociation:
            IS_DEV_ENABLED ?
                {
                    "header": "eyJmaWQiOjE3OTEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmOWM0ODNlNTFjOUIzNGMyYmNENTgyNTYwMzBlQjQzMmFEQTAyNDhmIn0",
                    "payload": "eyJkb21haW4iOiJ0dW4tNTUxMi5mbGFzaHNvZnQuZXUifQ",
                    "signature": "MHg0NGFjYWQ5NDg1ZTliOWJlODZlMDkxYzA0YWM4MTg0ZDUwM2U0ZmJmMzU3N2ViYzliMmFmMjA3MTU1NTZmYTc4Mzk3OWM2NjRlOTEwODAxZTYyYzg5Mzk3OTU1N2RjNjBhZGYxNDNmYTBlN2I2MmVjMjk3ZjQxZDdiMTc5YjFmZTFi"
                }
                :
                {
                    "header": "eyJmaWQiOjE3OTEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmOWM0ODNlNTFjOUIzNGMyYmNENTgyNTYwMzBlQjQzMmFEQTAyNDhmIn0",
                    "payload": "eyJkb21haW4iOiJibG9nLmZsYXNoc29mdC5ldSJ9",
                    "signature": "MHg5MjAyNTE1YzIxNzA3NDY0Y2VjYWI5ZjIxOTBkMTYwZTg5YjVjMjA1Y2M1NDdjN2I5N2Q5YWJhYmFhNjkwMmYzNzIwZDk1NmJlODAwMGYxMjgxMTk2NjJhNTkyZTgwYjU3Y2UzYjY1MTk4NDE3NWIxMTk3NjEwZmYyYTM3MGViNjFj"
                  }
    },
    FrameConfig: {
        // Manifest version. Required.
        version: '1',

        // App name. Required.
        // Max length of 32 characters.
        // Example: "Yoink!"
        name: config.siteName,

        // Default launch URL. Required.
        // Max 512 characters.
        // Example: "https://yoink.party/"
        homeUrl: config.baseSiteUrl + '/',

        // Frame application icon URL.
        // Max 512 characters.
        // Image must be 200x200px and less than 1MB.
        // Example: "https://yoink.party/img/icon.png"
        iconUrl: config.baseSiteUrl + '/hotlink-ok/splash.png',

        // Default image to show when frame is rendered in a feed.
        // Max 512 characters.
        // Image must have a 3:2 ratio.
        // Example: "https://yoink.party/framesV2/opengraph-image"
        imageUrl: config.baseSiteUrl  + '/images/frame-v2.png',

        // Default button title to use when frame is rendered in a feed.
        // Max 32 characters.
        // Example: "🚩 Start"
        buttonTitle: 'Open Article',

        // Splash image URL.
        // Max 512 characters.
        // Image must be 200x200px and less than 1MB.
        // Example: "https://yoink.party/img/splash.png"
        splashImageUrl: config.baseSiteUrl + '/hotlink-ok/splash.png' ,

        // Hex color code.
        // Example: "#eeeee4"
        splashBackgroundColor: '#35303f',


        // URL to which clients will POST events.
        // Max 512 characters.
        // Required if the frame application uses notifications.
        // Example: "https://yoink.party/webhook"
        webhookUrl: config.baseSiteUrl + '/api/fc-webhook',
    },

    triggers: [
        {   
            // Type of trigger, either cast or composer. Required.
            type: 'cast',

            // Unique ID. Required. Reported to the frame.
            // Example: "yoink-score"
            id: 'flashsoft-blog-id',

            // Handler URL. Required.
            // Example: "https://yoink.party/triggers/cast"
            url: config.baseSiteUrl
        },
        {
            type: 'composer',
            id: 'flashsoft-blog-id',
            url: config.baseSiteUrl
        }
    ] as TriggerConfig[],

    // Extended Metadata.
    subtitle: config.farcaster.extendedMetadata.subtitle,
    description: config.farcaster.extendedMetadata.description,
    screenshotUrls: config.farcaster.extendedMetadata.screenshotUrls,
    primaryCategory: config.farcaster.extendedMetadata.primaryCategory,
    tags: config.farcaster.extendedMetadata.tags,
    heroImageUrl: config.baseSiteUrl  + '/images/ogs/ffe-og-index.webp',
    tagline: config.farcaster.extendedMetadata.description,
    ogTitle: config.siteName,
    ogDescription: config.farcaster.extendedMetadata.description,
    ogImageUrl: config.baseSiteUrl  + '/images/ogs/ffe-og-index.webp',
}