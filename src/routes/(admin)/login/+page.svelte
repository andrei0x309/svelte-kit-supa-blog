<script lang="ts">

import { goto } from '$app/navigation';
import { setCookie } from '$lib/utils/common';

let errorTimer: any = 0;
let errorSec = 5;
let error = false;
let errorText = 'Wrong username or password';

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

const showError = (text: string) => {
  if(errorTimer){
    clearTimeout(errorTimer);
  }
  error = true;
  errorText = text;
  errorTimer = setTimeout(decSec, 1000);
}


let username = '';
let password = '';


const login = async () => {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  if(res.ok) {
    const data = await res.json();
    const hash = data.hash;
    setCookie('hash', hash, 90);
    setCookie('username', username, 90);
    goto('/admin/posts')
  } else {
    showError('Wrong username or password');
  }

}

</script>

<div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style="background-image:url('/images/black-linen.png')">
    <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <img src="/images/blogLogo.svg" width="150" alt="" srcset="" />
          <span class="text-gray-300">Login</span>
        </div>
        {#if error}
        <div class='flex flex-row bg-gray-900 rounded-[30px] m-4 py-2 px-4'>
          <span class='flex flex-col justify-center text-white font-bold grow-[1] max-w-[90%] text-center'>{errorText}</span>
          <div class='w-[2rem] ml-2 bg-red-400 rounded-r-2xl shadow-[0_0_20px_#ff444477]'>
            <small class="p-2 font-weight-700">{errorSec}</small>
          </div>
        </div>
        {/if}
        <form action="#">
          <div class="mb-4 text-lg flex justify-center">
            <input bind:value={username} class="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-black placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="username" />
          </div>
          <div class="mb-4 text-lg flex justify-center">
            <input  bind:value={password} class="rounded-3xl border-none bg-opacity-50 px-6 py-2 text-center text-black placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button on:click|preventDefault={login} type="submit" class="rounded-3xl bg-red-900 bg-opacity-80 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>