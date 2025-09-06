<script lang="ts">
import BlueSkyIcon from "$lib/theme/icons/platfroms/BlueSkyIcon.svelte";
import LinkCopyIcon from "$lib/theme/icons/platfroms/LinkCopyIcon.svelte";
import WhatsAppIcon from "$lib/theme/icons/platfroms/WhatsAppIcon.svelte";
import XIcon from "$lib/theme/icons/platfroms/XIcon.svelte";
import TelegramIcon from "$lib/theme/icons/platfroms/TelegramIcon.svelte";
import FaceBookIcon from "$lib/theme/icons/platfroms/FaceBookIcon.svelte";
import FarcasterIcon from "$lib/theme/icons/platfroms/FarcasterIcon.svelte";
import PinterestIcon from "$lib/theme/icons/platfroms/PinterestIcon.svelte";
import RedditIcon from "$lib/theme/icons/platfroms/RedditIcon.svelte";
import { articleSettings } from "$lib/config/index";
import type { Component } from "svelte";
import { beforeNavigate } from "$app/navigation";
import { clickOutside } from "$lib/utils/client/misc";
    import { fade } from "svelte/transition";

interface Props {
    articleLink: string;
    articleTitle: string;
    featureImage?: string;
}

let { articleLink, articleTitle, featureImage }: Props = $props();
let isCopied = $state(false);
let showPopup = $state(false);

const slug = articleLink.split('/').pop();

const platforms = {
    'x': XIcon,
    'whatsapp': WhatsAppIcon,
    'telegram': TelegramIcon,
    'facebook': FaceBookIcon,
    'farcasterXYZ': FarcasterIcon,
    'fosscaster': FarcasterIcon,
    'bluesky': BlueSkyIcon,
    'copyLink': LinkCopyIcon,
    'pinterest': PinterestIcon,
    'reddit': RedditIcon
}


const enabledPlatforms = Object.keys(articleSettings.enableSharePlatforms)
.filter((platform) => 
{
  if (platform === 'pinterest') {
    return articleSettings.enableSharePlatforms[platform as keyof typeof articleSettings.enableSharePlatforms].enabled && featureImage
  }
  return articleSettings.enableSharePlatforms[platform as keyof typeof articleSettings.enableSharePlatforms].enabled
}).sort((a, b) => {
    const aIndex = articleSettings.enableSharePlatforms[a as keyof typeof articleSettings.enableSharePlatforms].order;
    const bIndex = articleSettings.enableSharePlatforms[b as keyof typeof articleSettings.enableSharePlatforms].order;
    return aIndex - bIndex;
})

console.log('enabledPlatforms', enabledPlatforms)

const copyLink = async () => {
    try {
      // Use the modern Clipboard API
      await navigator.clipboard.writeText(articleLink);
      isCopied = true;
      setTimeout(() => (isCopied = false), 2000);
    } catch (err) {
      // Fallback for browsers where navigator.clipboard is not available
      const textArea = document.createElement('textarea');
      textArea.value = articleLink;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        isCopied = true;
        setTimeout(() => (isCopied = false), 2000);
      } catch (err) {
        console.error('Failed to copy text using execCommand', err);
      }
      document.body.removeChild(textArea);
    }
  }


const shareTo = (platform: string) => {
     const encodedLink = encodeURIComponent(articleLink);
     const encodedTitle = encodeURIComponent(articleTitle);
     showPopup = false;


    console.log('platform', platform, encodedLink, encodedTitle)

     switch (platform) {
         case 'x':
          window.open(`
          https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`, '_blank');
         break;
         case 'whatsapp':
          window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%A0${encodedLink}`, '_blank');
         break;
         case 'pinterest':
          window.open(`https://pinterest.com/pin/create/bookmarklet/?url=${encodedLink}&description=${encodedTitle}&media=${featureImage}`, '_blank');
         break;
         case 'reddit':
          window.open(`https://reddit.com/submit?url=${encodedLink}&title=${encodedTitle}`, '_blank');
         break;
         case 'facebook':
          window.open(`https://www.facebook.com/sharer.php?u=${encodedLink}`, '_blank');
          break;
         case 'bluesky':
          window.open(`https://bsky.app/intent/compose?text=${encodedTitle}%0A${encodedLink}%0A`, '_blank');
          break;
         case 'telegram':
          window.open(`https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`, '_blank');
          break;
         case 'farcaster':
          window.open(`https://farcaster.xyz/~/compose?text=${encodedLink}%0A`, '_blank');
          break;
         case 'fosscaster':
          window.open(`https://fosscaster.xyz/~/compose?text=${encodedLink}%0A`, '_blank');
          break;
         case 'copyLink':
          copyLink();
          break;
     }
};

beforeNavigate(() => {
  showPopup = false;
});

</script>

<div use:clickOutside={() => showPopup = false} >
<button aria-label="share button" class="share-wrapper" onclick={() => {
  console.log('showPopup', showPopup)
}}>

  <input id="{`share-toggle-${slug}`}" type="checkbox" class="check" bind:checked={showPopup} />
  <label for="{`share-toggle-${slug}`}" class="container">
    <svg
      class="icon inactive"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.87L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.95 7.13C16.46 7.62 17.24 7.92 18 7.92C19.66 7.92 21 6.58 21 4.92C21 3.26 19.66 1.92 18 1.92C16.34 1.92 15 3.26 15 4.92C15 5.16 15.04 5.39 15.09 5.62L8.05 9.79C7.54 9.3 6.76 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.76 15 7.54 14.7 8.05 14.21L15.18 18.38C15.13 18.61 15.09 18.84 15.09 19.08C15.09 20.74 16.43 22.08 18.09 22.08C19.75 22.08 21.09 20.74 21.09 19.08C21.09 17.42 19.75 16.08 18 16.08Z"
      ></path>
    </svg>
    <svg
      class="icon active"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.87L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.95 7.13C16.46 7.62 17.24 7.92 18 7.92C19.66 7.92 21 6.58 21 4.92C21 3.26 19.66 1.92 18 1.92C16.34 1.92 15 3.26 15 4.92C15 5.16 15.04 5.39 15.09 5.62L8.05 9.79C7.54 9.3 6.76 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.76 15 7.54 14.7 8.05 14.21L15.18 18.38C15.13 18.61 15.09 18.84 15.09 19.08C15.09 20.74 16.43 22.08 18.09 22.08C19.75 22.08 21.09 20.74 21.09 19.08C21.09 17.42 19.75 16.08 18 16.08Z"
      ></path>
    </svg>
    <div class="checkmark"></div>
  </label>

</button>

  {#if showPopup}
   <ul class="share-toolbar">
    {#each enabledPlatforms as platform}
      {@const DynComponent = platforms[platform as keyof typeof platforms] as Component }
       {#if DynComponent}
       <li>
        <button onclick={() => shareTo(platform)} aria-label="share to {platform}" class="contents cursor-pointer">
        <DynComponent />
        </button>
       </li>
       {/if}
    {/each}
  </ul>
  {/if}
  {#if isCopied }
  <div class="popup fade-in">
    <span>Link copied to clipboard</span>
  </div>
  {/if}
 </div>
 

<style scoped>

.share-wrapper {
   --radius: 0.3rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  --dot-bg: var(--bg-color);
  --dot-color: #313131;
  --dot-size: 1px;
  --dot-space: 22px;
  background:
    linear-gradient(
        90deg,
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    linear-gradient(
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    var(--dot-color);
  border: 0.1rem solid #313131;
  padding: 0.3rem;
  border-radius: var(--radius);
  box-shadow: 0 0 1em 0.3em rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.check[type="checkbox"] {
  display: none;
}

.container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: -0.25em;
  margin-bottom: -0.25em;
}

.icon {
  width: 1.4rem;
  height: 1.4rem;
  padding: 0.2rem;
  left: -0.1rem;
  fill: var(--text-color);
  position: relative;
  transition: opacity 0.3s ease-in-out;
}

.icon.active {
  display: none;
  fill: #2196f3;
}

.check[type="checkbox"]:checked + .container .icon.active {
  display: inline-block;
  animation: pop 0.5s ease-in-out;
}

.check[type="checkbox"]:checked + .container .icon.inactive {
  display: none;
}

.share-toolbar {
  margin-top: 0.5rem;
  border: 1px solid #949494;
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  width: 38px;
  background-color: var(--bg-color);
  list-style-type: none;
  padding: 0;
  z-index: 1010;
  left: -0.1rem;
  overflow: visible;

  li {
    padding: 0.4rem;
    list-style: none;
  }

  li::marker{
    content: "";
  }

  li:hover {
    scale: 1.2;
  }
}

.share-toolbar:before {
    background-color: inherit;
    border-left: 1px solid #949494;
    border-radius: 2px;
    border-top: 1px solid #949494;
    content: "";
    height: 10px;
    left: 50%;
    position: absolute;
    top: -6px;
    transform: translate(-50%) rotate(45deg);
    width: 10px;
    z-index: 1;
}

.popup {
position: absolute;
    transform: translate(-50%, -100%);
    background-color: var(--bg-color);
    border: 1px solid #949494;
    border-radius: 8px;
    padding: 0.5rem;
    z-index: 1010;
    width: 12rem;
    left: -150%;
    top: 100%;
}

.fade-in {
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  -moz-animation: fadeIn ease 2s;
  -o-animation: fadeIn ease 2s;
  -ms-animation: fadeIn ease 2s;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>