<script>
    import FooterIcons from '$lib/theme/footer/icons.svelte';
    import WrenchAdmin from '$lib/theme/icons/WrenchAdmin.svelte'
</script>

<footer class="footer pt-4 flex w-full items-center flex-col text-center text-sm text-white content-center justify-center">
    <FooterIcons />
    <a href="/login" class="inline-block text-[0.9] mb-1 hover:scale-105 transition-transform">
        <WrenchAdmin />
        Admin</a>
    <p class="text-xs my-2">
        <a href="https://github.com/andrei0x309/svelte-kit-supa-blog" rel="external" class="hover:underline">Source Code</a>
        | <a href="https://github.com/andrei0x309/svelte-kit-supa-blog/blob/main/CHANGELOG.md" rel="external" class="hover:underline">Changelog</a>
    </p>
    <a rel="nofollow external" href="https://status.flashsoft.eu" class="mb-3 hover:scale-105 transition-transform">
        <img class="mx-auto mt-4" src="https://uptime.betterstack.com/status-badges/v1/monitor/1u13o.svg" alt="FlashSoft.eu Status" />
    </a>
</footer>
