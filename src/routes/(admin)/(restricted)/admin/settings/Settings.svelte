<script lang="ts">
	import Menu from '@/routes/(admin)/(restricted)/admin/menu.svelte';
</script>

<div class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
	<div
		class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2"
	>
		<Menu />
		<div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
			<div id="users">
				<h1 class="font-bold py-4 uppercase">Settings</h1>
                <slot name="content"></slot>
			</div>
		</div>
	</div>
</div>