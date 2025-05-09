<script lang="ts">
  import { setCookie } from '$lib/utils/common';
  import { afterNavigate } from  '$app/navigation';
  import MenuDesktop from './menu/MenuDesktop.svelte';
  import MenuMobileToggle from './menu/MenuMobileToggle.svelte';
  import MenuMobile from './menu/MenuMobile.svelte';
  import { theme as themeStore } from '@/stores/main';
  interface Props {
    theme?: string;
  }

  let sideMenu: HTMLElement | undefined = $state();

const closeMenu = () => {
  sideMenu?.classList.remove('sideMenuToggle');
};

  let { theme = $bindable('dark') }: Props = $props();
  

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`;

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;

let isSwitchingTheme = false;
let searchModalOpen = false;
let svgContainer: HTMLElement | undefined = $state();

const themeSwitch = () => {
  if(!isSwitchingTheme){
    const isDarkMode = theme === 'dark';
    isSwitchingTheme = true;
    if(svgContainer){
      if(isDarkMode){
        svgContainer.classList.add('bg-yellow-500','-translate-x-2');
        svgContainer.classList.remove('bg-gray-700','translate-x-full');
        theme = 'light';
        themeStore.set('light');
        setCookie('theme_color','light', 90);
        setTimeout(() => {
          if (svgContainer === undefined) return;
          svgContainer.innerHTML = darkIcon;
    }, 50);
      }
      else{
        svgContainer.classList.remove('bg-yellow-500','-translate-x-2');
        svgContainer.classList.add('bg-gray-700','translate-x-full');
        theme = 'dark';
        themeStore.set('dark');
        setCookie('theme_color','dark', 90);
        setTimeout(() => {
          if (svgContainer === undefined) return;
          svgContainer.innerHTML = lightIcon;
      })
    }
  }
    isSwitchingTheme = false;
  }
};

const showSearchModal = () => {
  if(!searchModalOpen) {
  searchModalOpen = true;
  const searchModal=document.createElement('div');
  searchModal.classList.add('full-search-modal');
  searchModal.id="full-search-modal";
  searchModal.innerHTML =  `
<button id="search-close-btn">X</button> 
<form id="menu-search-form" role="search" method="get" class="search-form" action="${window.location.origin}/search">
	<label style="display:none;" for="menu-search-input">Search</label>
        <input placeholder="Search" type="search" id="menu-search-input" class="search-field" name="q" autocomplete="off" />
        <input style="display:none;" type="submit" class="search-submit" value="search" />
</form>
  </div>`;
  document?.getElementById("root-app")?.append(searchModal);
  document?.getElementById('search-close-btn')?.addEventListener('click', closeSearchModal);
  document?.getElementById('menu-search-form')?.addEventListener('submit', searchAddSpinner);
  document?.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeSearchModal();
  });
  }
};

const addSimpleSpinner = (element: any, prepend = true) => {
    const spinner = document.createElement('div');
    spinner.classList.add('loadingspinner');
    if(prepend) element.prepend(spinner);
    else element.appendChild(spinner);
    return spinner;
};

const searchAddSpinner = (e: any) => {
    addSimpleSpinner(e.target, false);
};

const closeSearchModal = () => {
    if(searchModalOpen) {
    const searchModal = document.getElementById('full-search-modal');
    if(searchModal) {
    ;(document?.getElementById('search-close-btn') as any).removeEventListener('click', closeSearchModal)
    ;(document?.getElementById('menu-search-form') as any).removeEventListener('menu-search-form', searchAddSpinner)
    document?.removeEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeSearchModal();
    });
    searchModalOpen = false;
    searchModal.style.animation = 'search-modal-close 0.4s linear forwards';
    searchModal.addEventListener('animationend', () => {
    searchModal.parentElement?.removeChild(searchModal);
});
    }

    }
};

afterNavigate(() => {
    closeSearchModal();
});

</script>
<MenuMobile closeMenu={closeMenu} bind:sideMenu={sideMenu} />
<header class="header flex flex-row bg-gray-200 items-center content-va-off">
    <div class="logo min-h-full h-16 w-40 py-2 rounded-tr-full bg-[#1d1d1d]">
<a title="home" href="/">
<img height="48" width="96" class="h-full ml-4" src="/images/blogLogo.svg" alt="flashsoft.eu Blog Logo" >
</a>
    </div>
 
    <!-- <nav class="header-nav  min-h-full md:flex flex-row text-gray-100 text-center px-4">
          <input class="menu-btn" type="checkbox" id="menu-btn" />
         <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>

   <?php if (has_nav_menu('secondary-menu')) { ?>
              <?php wp_nav_menu(['theme_location' => 'secondary-menu', 'walker' => new Walker_Nav_Menu_Custom()]); ?>
  <?php }?> 
    </nav>
     <?php get_search_form(['a309_menu' => true]); ?>  -->

<button onclick={themeSwitch} aria-label="Theme Switch" class="{`cursor-pointer ml-5 w-16 h-6 rounded-full flex items-center transition duration-300 focus:outline-hidden shadow-sm ${theme === 'dark' ? 'bg-gray-700': 'bg-white'}`}">
  <div bind:this={svgContainer} class="{`border border-white w-9 h-9 relative rounded-full transition duration-500 transform ${theme === 'dark' ? 'bg-zinc-700 translate-x-full' : 'bg-zinc-700 -translate-x-2' } p-1 text-white`}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
  </div>
</button>
<button onclick={showSearchModal} id="menu-search-btn" class="icon-search link-search-icon" aria-label="search button to open search modal"></button>  
<MenuMobileToggle closeMenu={closeMenu} sideMenu={sideMenu} />
<MenuDesktop />
</header>
