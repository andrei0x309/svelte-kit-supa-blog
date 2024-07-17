<script lang="ts">
	import { modalOpen } from '@/stores/main';
	import { fade } from 'svelte/transition';
	const close = () => {
		modalOpen.set(false);
	};
</script>

{#if $modalOpen}
<div
	class="bg"
	transition:fade
	on:click={close}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			close();
		}
	}}
>
	<div
		class="wrap"
		on:click={close}
		on:keypress={(e) => {
			if (e.key === 'Escape') {
				close();
			}
		}}
	>
		<div
			class="window"
			role="dialog"
			aria-modal="true"
			aria-label="Modal"
			aria-labelledby="modal-title"
			transition:fade
		>
			<button class="close" aria-label="Close modal" on:click={close} />
			<div class="modal-content">
				<slot name="type">
                    <h2 id="modal-title">Modal title</h2>
                    <p>Modal content</p>

                </slot>
			</div>
		</div>
	</div>
</div>
{/if}

<style>
	.bg {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.836);
	}

	.wrap {
		position: relative;
		margin: 2rem;
		max-height: 100%;
	}

	.window {
		position: relative;
		width: 40rem;
		max-width: 100%;
		max-height: 100%;
		margin: 2rem auto;
		color: rgb(218, 218, 218);
		border-radius: 0.5rem;
		background: rgba(41, 41, 41, 0.877);
	}

	.modal-content {
		position: relative;
		padding: 1rem;
		max-height: calc(100vh - 4rem);
		overflow: auto;
	}

	.close {
		display: block;
		box-sizing: border-box;
		position: absolute;
		z-index: 1000;
		top: 1rem;
		right: 1rem;
		margin: 0;
		padding: 0;
		width: 1.5rem;
		height: 1.5rem;
		border: 0;
		color: black;
		border-radius: 1.5rem;
		background: white;
		box-shadow: 0 0 0 1px black;
		transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
			background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
		-webkit-appearance: none;
	}

	.close:before,
	.close:after {
		content: '';
		display: block;
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		width: 1rem;
		height: 1px;
		background: black;
		transform-origin: center;
		transition: height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
			background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
	}

	.close:before {
		-webkit-transform: translate(0, -50%) rotate(45deg);
		-moz-transform: translate(0, -50%) rotate(45deg);
		transform: translate(0, -50%) rotate(45deg);
		left: 0.25rem;
	}

	.close:after {
		-webkit-transform: translate(0, -50%) rotate(-45deg);
		-moz-transform: translate(0, -50%) rotate(-45deg);
		transform: translate(0, -50%) rotate(-45deg);
		left: 0.25rem;
	}

	.close:hover {
		background: black;
	}

	.close:hover:before,
	.close:hover:after {
		height: 2px;
		background: white;
	}

	.close:focus {
		border-color: #3399ff;
		box-shadow: 0 0 0 2px #3399ff;
	}

	.close:active {
		transform: scale(0.9);
	}

	.close:hover,
	.close:focus,
	.close:active {
		outline: none;
	}
</style>
