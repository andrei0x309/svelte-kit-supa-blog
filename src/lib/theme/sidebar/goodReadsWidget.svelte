<script lang="ts">
	export let goodReads: string
</script>

<div id="custom_html-2" class="widget_text widget widget_custom_html">
	<h2 class="widgettitle">My recent book reviews</h2>
	<div class="textwidget custom-html-widget">
		{@html goodReads}	 
	</div>
</div>
