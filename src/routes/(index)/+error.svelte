<script lang="ts">
    import ErrorPage from "@/lib/components/shared/ErrorPage.svelte";
    interface Props {
        data: any;
    }

    let { data = $bindable() }: Props = $props();

</script>

<ErrorPage data={data} />