<script lang="ts">
interface Props {
  class?: string | undefined;
}

const { class: className }: Props = $props();
</script>

<svg class={className} viewBox="0 0 16 16"
  ><path d="M2,9 L2,7 L14,7 L14,9 L2,9 Z M2,13 L2,11 L14,11 L14,13 L2,13 Z M2,5 L2,3 L14,3 L14,5 L2,5 Z" fill-rule="evenodd" /></svg
>
