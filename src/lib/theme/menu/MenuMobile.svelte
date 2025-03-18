<script lang="ts">
  import FrontIcon from './icons/FrontIcon.svelte';
  import ProjectsIcon from './icons/ProjectsIcon.svelte';
  import CoursesIcon from './icons/CoursesIcon.svelte';
  import ContactIcon from './icons/ContactIcon.svelte';
  import TipIcon from './icons/TipIcon.svelte';

  let { sideMenu = $bindable(), closeMenu } = $props<{ sideMenu: HTMLElement | undefined; closeMenu: () => void }>();
  let close: HTMLElement | undefined; // document.getElementById('menu-close');
</script>

<nav bind:this={sideMenu} id="side-menu" class="fixed w-11/12 h-full top-0 left-0 overflow-auto bg-white text-amber-50">
  <button onclick={closeMenu} bind:this={close} aria-label="Close Side Menu" id="menu-close">×</button>

  <ul class="sidebar-menu-nav">
    <ul>
      <li class="side-menu">
        <a class="value" rel="external" href="https://www.flashsoft.eu">
          <FrontIcon class="h-8 w-8 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative"/>
          Front
        </a>
      </li>
      <li class="side-menu">
        <a class="value" rel="external" href="https://www.flashsoft.eu/projects">
          <ProjectsIcon class="h-8 w-8 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative" />
          Projects
        </a>
      </li>
      <li class="side-menu">
        <a class="value" rel="external" href="https://www.flashsoft.eu/certs">
          <CoursesIcon class="h-8 w-8 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative" />
          Courses
        </a>
      </li>
      <li class="side-menu">
        <a class="value" rel="external" href="https://flashsoft.eu/#section-contact">
          <ContactIcon class="h-8 w-8 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative" />
          Contact
        </a>
      </li>
      <li class="side-menu">
        <a class="value" href="/tip-me" onclick={closeMenu}>
          <TipIcon class="h-8 w-8 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative" />
          Tip
        </a>
      </li>
    </ul>
  </ul>
  <div class="rst-sb text-2xl mt-16">
    <p class="text-gray-200">
      <span class="rst-s block ml-14">Andrei O.</span>
      <span class="rst-s block ml-8">(andrei0x309)</span>
    </p>
  </div>
  <div class="rsd-sb">
    <p class="text-gray-300">Web Developer</p>
    <p class="text-gray-300">Software Developer</p>
  </div>

  <div class="flex pl-16"></div>
</nav>

<style lang="scss" scoped>
  #side-menu:global(.sideMenuToggle) {
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transform: translateX(0);
  }

  #side-menu {
    border-right: 2px solid #000;
    border-top: 0.6rem solid #f1b01e;
    z-index: 6;
    transition: all 0.15s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform: translateX(-100%);
    max-width: 40rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    background: rgba(2, 3, 14, 0.9607843137);
    backdrop-filter: blur(10px);
  }

  #menu-close {
    color: rgb(214, 214, 214);
    font-size: 3rem;
    position: relative;
    right: -90%;
  }

  .sidebar-menu-nav {
    position: relative;
  }

  .sidebar-menu-nav li {
    font-size: 1.4em;
    margin-bottom: 1rem;
    margin-left: 3rem;
}

.rsd-sb {
    margin-left: 3rem;
    margin-top: 0.6rem;
    font-size: 1.05rem;
    margin-bottom: 2rem;
}

</style>
