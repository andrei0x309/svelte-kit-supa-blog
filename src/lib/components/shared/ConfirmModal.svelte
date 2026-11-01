<script lang="ts">
import { modalOpen } from '#/stores/main.ts';
import Modal from './Modal.svelte';

const initialState = {
  title: 'Confirm',
  message: 'Are you sure?'
};

let title: string = $state(initialState.title);
let message: string = $state(initialState.message);
let newTitle: string = $state(initialState.title);
let newMessage: string = $state(initialState.message);

interface Props {
  onCancel?: () => void;
  onOkay?: () => void;
}

let { onCancel = () => { return }, onOkay = $bindable(() => { return }) }: Props = $props();

export const setOkay = (fn: () => void) => {
  onOkay = fn;
};

export const setCancel = (fn: () => void) => {
  onCancel = fn;
};

export const show = (t = '', m = '') => {
  newTitle = t;
  newMessage = m;
  modalOpen.set(true);
};

function _onCancel() {
  onCancel();
  modalOpen.set(false);
}

function _onOkay() {
  onOkay();
  modalOpen.set(false);
}

$effect(() => {
  if ($modalOpen) {
    title = newTitle;
    message = newMessage;
  } else {
    newTitle = 'Confirm';
    newMessage = 'Are you sure?';
  }
});
</script>

<Modal>
  {#snippet type()}
    <div>
      <h2>{title}</h2>

      <p class="p-4 text-center text-[1.1rem]">{message}</p>

      <div class="buttons">
        <button class="btn-pag" onclick={_onCancel}> Cancel </button>
        <button class="btn-pag" onclick={_onOkay}> Okay </button>
      </div>
    </div>
  {/snippet}
</Modal>

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    max-width: 30rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .btn-pag {
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-pag:hover {
        filter: brightness(1.5) drop-shadow(2px 4px 6px black);
  }
</style>