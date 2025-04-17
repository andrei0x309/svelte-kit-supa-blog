import { FCConfig } from '$lib/config/farcaster';

export const generateURLFCFrameEmbed = (featureImage = '', url: string) => {
    const FrameEmbed = {
        // Frame spec version. Required.
        // Example: "next"
        version: 'next',
      
        // Frame image.
        // Max 512 characters.
        // Image must be 3:2 aspect ratio and less than 10 MB.
        // Example: "https://yoink.party/img/start.png"
        imageUrl: featureImage || FCConfig.FrameConfig.imageUrl,
      
        // Button attributes
        button: {
          // Button text.
          // Max length of 32 characters.
          // Example: "Yoink Flag"
          title: 'Open Article',
      
          // Action attributes
          action: {
            // Action type. Must be "launch_frame".
            type: 'launch_frame',
      
            // App name
            // Max length of 32 characters.
            // Example: "Yoink!"
            name: 'Flashsoft Blog',
      
            // Frame launch URL.
            // Max 512 characters.
            // Example: "https://yoink.party/"
            url,
      
            // Splash image URL.
            // Max 512 characters.
            // Image must be 200x200px and less than 1MB.
            // Example: "https://yoink.party/img/splash.png"
            splashImageUrl: FCConfig.FrameConfig.splashImageUrl,
      
            // Hex color code.
            // Example: "#eeeee4"
            splashBackgroundColor: '#35303f'
          }
        }
      };
     return JSON.stringify(FrameEmbed)
}