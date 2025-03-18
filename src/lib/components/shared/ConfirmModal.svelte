<script lang="ts">
  import { run } from 'svelte/legacy';

    import { modalOpen } from '@/stores/main';
    import Modal from './Modal.svelte';
      
      const initalState = {
          title: 'Confirm',
          message: 'Are you sure?'
      }

      let title: string = $state(initalState.title);
      let message: string = $state(initalState.message);
      let newTitle: string = $state(initalState.title);
      let newMessage: string = $state(initalState.message);

  interface Props {
    onCancel?: any;
    onOkay?: any;
  }

  let { onCancel = () => {}, onOkay = $bindable(() => {}) }: Props = $props();


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

      run(() => {
            if($modalOpen) {
                title = newTitle;
                message = newMessage;
            } else {
                newTitle = 'Confirm';
                newMessage = 'Are you sure?';
            }

      });
      
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
    {#snippet type()}
    <div >
          <h2>{title}</h2>

          <p class="p-4 text-center text-[1.1rem]">{message}</p>

          <div class="buttons">
              <button class="btn-pag" onclick={_onCancel}>
                  Cancel
              </button>
              <button class="btn-pag" onclick={_onOkay}>
                  Okay
              </button>
          </div>
      </div>
  {/snippet}
</Modal>

