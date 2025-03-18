<script lang="ts">
    import MenuIcon from './icons/MenuIcon.svelte';
	import { Swipe } from '$lib/utils/swipe';
	import { onMount } from 'svelte';

	let { sideMenu, closeMenu } = $props();
	let toggle: HTMLElement | undefined; // document.getElementById('menu_toggle');

	const toggeleMenu = () => {
		console.log('Element reference in Child B:', sideMenu);
		sideMenu?.classList.add('sideMenuToggle');
		const menuLinks = sideMenu?.querySelector('.sidebar-menu-nav')?.querySelectorAll('.sidemenu');
		if (menuLinks) {
			let i = 1;
			for (const menuLink of menuLinks as unknown as HTMLElement[]) {
				const timeout = 130 * i;
				setTimeout(() => {
					menuLink.style.animation = 'menuLinkSlideLeft 0.8s ease-in forwards;';
				}, timeout);
				i++;
			}
		}
	};

	onMount(() => {
		$effect(() => {
			if (sideMenu) {
				new Swipe(sideMenu, function (event: unknown, direction: string) {
					if (direction === 'left') {
						closeMenu();
					}
				});
			}
		});
	});
</script>

<button
	bind:this={toggle}
	aria-label="Open Side Menu"
	id="menu_toggle"
	class="icon-bars menu-phone inline md:hidden"
	onclick={toggeleMenu}
>
<MenuIcon/>
</button>

<style scoped>
    :global(.icon-bars svg) {
    fill: var(--text-color);
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 50%;
        border: 1px solid rgba(238, 238, 238, 0.7607843137);
        background: linear-gradient(to bottom, #595959 0%, rgb(44, 33, 49) 100%);
        padding: 0.4rem;
        margin-left: 0.3rem;
    }

@keyframes menuLinkSlideLeft {
	0% {
		margin-left: 0rem;
	}
        10% {
		margin-left: 2rem;
	}
        20% {
		margin-left: 3rem;
	}
        30% {
		margin-left: 4rem;
	}
        40% {
		margin-left: 5rem;
	}
        50% {
		margin-left: 4.5rem;
	}
        60% {
	    margin-left: 4rem;
	}
	70% {
		margin-left: 3rem;
	}
        80% {
		margin-left: 2rem;
	}
        90% {
		margin-left: 2.5rem;
	}
        100% {
		margin-left: 3rem;
	}
}

</style>