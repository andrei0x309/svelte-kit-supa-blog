<script lang="ts">
  interface Props {
    class?: string | undefined;
  }

  const { class: className }: Props = $props();
</script>

<svg fill="currentColor" class={className} viewBox="0 0 128 128"
  ><path
    d="M76.79,19.16,22.2,49.27,0,119.55,36.56,83a5.93,5.93,0,0,1,1.06-.83,13.68,13.68,0,1,1,8.22,8.22A6,6,0,0,1,45,91.44L8.45,128l70.28-22.2,30.12-54.59L128,32.05,95.95,0Z"
  /></svg
>
