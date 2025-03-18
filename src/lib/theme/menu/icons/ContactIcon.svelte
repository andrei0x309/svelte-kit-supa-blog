<script lang="ts">
  const { class: className } = $props<{ class?: string | undefined }>();
</script>

<svg
  style="enable-background:new 0 0 16 16;"
  version="1.1"
  viewBox="0 0 16 16"
  class={className || 'h-4 w-4 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative'}
  ><path
    fill="currentColor"
    d="M8,10c-0.266,0-0.5-0.094-1-0.336L0,6v7c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V6L9,9.664C8.5,9.906,8.266,10,8,10z M15,2  H1C0.45,2,0,2.45,0,3v0.758l8,4.205l8-4.205V3C16,2.45,15.55,2,15,2z"
  /></svg
>
