<script lang="ts">
interface Props {
  tagCloud: string;
}

let { tagCloud }: Props = $props();
</script>

<div class="widget widget_tag_cloud">
  <h2 class="widgettitle">Tag Cloud</h2>
  <div class="tagcloud" id="tag_cloud-widget">
    {@html tagCloud}
  </div>
</div>

<style>

.tagcloud {
  :global(a) { margin: 0 0.5rem 0.5rem 0;
    display: inline-block;
  }
}

</style>