<script lang="ts">
let errorTimer: any = 0;
let errorSec = 5;
let error = false;
let success = false;
let alertText = 'Wrong username or password';

const decSec = () => {
    errorSec = errorSec - 1;
    if(errorSec === 0) {
      errorSec = 5;
      error = false;
      clearTimeout(errorTimer);
    } else {
      errorTimer = setTimeout(decSec, 1000);
    }
  }

export const showError = (text: string) => {
  if(errorTimer){
    errorSec = 5;
    clearTimeout(errorTimer);
  }
  success = false;
  error = true;
  alertText = text;
  errorTimer = setTimeout(decSec, 1000);
}

export const showSuccess = (text: string) => {
  if(errorTimer){
    errorSec = 5;
    clearTimeout(errorTimer);
  }
  success = true;
  error = true;
  alertText = text;
  errorTimer = setTimeout(decSec, 1000);
}

const hideError = () => {
  error = false;
  errorSec = 5;
  clearTimeout(errorTimer);
}

</script>

{#if error}
<div class='flex flex-row bg-gray-900 rounded-[30px] m-4 py-2 px-4'>
    <div class="{`w-[2rem] mr-2 ${ success ? 'bg-green-400': 'bg-red-400'} rounded-2xl shadow-[0_0_20px_#ff444477]`}">
        <small class="pl-3 font-weight-700">{errorSec}</small>
    </div>
  <span class='flex flex-col justify-center text-white font-bold grow-[1] max-w-[90%] text-center'>{alertText}</span>
  <button class="text-[0.6rem] rounded-2xl shadow-[0_0_20px_#222] p-1 ml-2" on:click={hideError} >x</button>
</div>
{/if}