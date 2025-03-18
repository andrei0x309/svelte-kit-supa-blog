<script lang="ts">
  const { class: className } = $props<{ class?: string | undefined }>();
</script>

<svg id="Icons" viewBox="0 0 24 24" 
class={className || 'h-4 w-4 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative'}
  ><path
    fill="currentColor"
    d="M21,5H5A1,1,0,0,1,5,3h6A2.006,2.006,0,0,0,9,1H3A2.006,2.006,0,0,0,1,3V19a4,4,0,0,0,4,4H19a4,4,0,0,0,4-4V7A2.006,2.006,0,0,0,21,5ZM5,14H9a1,1,0,0,1,0,2H5a1,1,0,0,1,0-2Zm9,6H5a1,1,0,0,1,0-2h9a1,1,0,0,1,0,2Z"
  /></svg
>
