<script lang="ts">
    interface Props {
        tagCloud: string;
    }

    let { tagCloud }: Props = $props();
</script>

<div id="tag_cloud-3" class="widget widget_tag_cloud"><h2 class="widgettitle">Tag Cloud</h2>
    <div class="tagcloud" id="tag_cloud-widget">
            {@html tagCloud}
    </div>
</div>
