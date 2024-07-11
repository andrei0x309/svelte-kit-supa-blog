<script lang="ts">
  import { setCookie } from '$lib/utils/common';

  export let theme ='dark'
  

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`;

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`;

let isSwitchingTheme = false;
let svgContainer: HTMLElement;

const themeSwitch = () => {
  if(!isSwitchingTheme){
    const isDarkMode = theme === 'dark';
    isSwitchingTheme = true;
    if(svgContainer){
      if(isDarkMode){
        svgContainer.classList.add('bg-yellow-500','-translate-x-2');
        svgContainer.classList.remove('bg-gray-700','translate-x-full');
        theme = 'light';
        setCookie('theme_color','light', 90);
        setTimeout(() => {
          svgContainer.innerHTML = darkIcon;
    }, 50);
      }
      else{
        svgContainer.classList.remove('bg-yellow-500','-translate-x-2');
        svgContainer.classList.add('bg-gray-700','translate-x-full');
        theme = 'dark';
        setCookie('theme_color','dark', 90);
        setTimeout(() => {
          svgContainer.innerHTML = lightIcon;
      })
    }
  }
    isSwitchingTheme = false;
  }
};

</script>

<header class="header flex flex-row bg-gray-200 items-center content-va-off">
    <div class="logo min-h-full h-16 w-40 py-2 rounded-tr-full article">
<a title="home" href="/">
<img height="48" width="96" class="h-full ml-4" src="/images/blogLogo.svg" role="presentation"  alt="flashsoft.eu Blog Logo" >
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

<button on:click={themeSwitch} aria-label="Theme Switch" class="ml-5 w-16 h-6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow">
  <div bind:this={svgContainer} class="{`border border-white w-9 h-9 relative rounded-full transition duration-500 transform ${theme === 'dark' ? 'bg-gray-700 translate-x-full' : 'bg-yellow-500 -translate-x-2' } p-1 text-white`}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
  </div>
</button>
</header>
