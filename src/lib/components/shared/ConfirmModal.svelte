<script lang="ts">
    import { modalOpen } from '@/stores/main';
    import Modal from './Modal.svelte';

      let title: string = 'Confirm';
      let message: string = 'Are you sure?';
      let newTitle: string = title;
      let newMessage: string = message;

      export let onCancel = () => {};
      export let onOkay = () => {};


      export const setOkay = (fn: () => void) => {
          onOkay = fn;
      }

      export const setCancel = (fn: () => void) => {
          onOkay = fn;
      }

      export const show = (t = '', m = '') => {
           newTitle = t;
           newMessage = m;
           modalOpen.set(true);
      }

  
      function _onCancel() {
          onCancel();
          modalOpen.set(false);

      }
      
      function _onOkay() {
          onOkay();
          modalOpen.set(false);
      }

      $: {
            if($modalOpen) {
                title = newTitle;
                message = newMessage;
            } else {
                newTitle = 'Confirm';
                newMessage = 'Are you sure?';
            }

      }
      
  </script>
  

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
	}
</style>

  
<Modal>
    <div slot="type">
        <h2>{title}</h2>

        <p class="p-4 text-center text-[1.1rem]">{message}</p>

        <div class="buttons">
            <button class="btn-pag" on:click={_onCancel}>
                Cancel
            </button>
            <button class="btn-pag" on:click={_onOkay}>
                Okay
            </button>
        </div>
    </div>
</Modal>

