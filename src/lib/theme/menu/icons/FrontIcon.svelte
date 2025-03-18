<script lang="ts">
  const { class: className } = $props<{ class?: string | undefined }>();
</script>

<svg  viewBox="0 0 24 24" 
class={className || 'h-4 w-4 inline-block mr-[0.1rem] text-gray-100 top-[0.2rem] relative'}
>
  <path d="M9,13H15V19H18V10L12,5.5L6,10V19H9V13M4,21V9L12,3L20,9V21H4Z" fill="currentColor"></path>
</svg>
