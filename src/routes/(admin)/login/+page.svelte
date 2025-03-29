<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

import Alert from '$lib/components/shared/Alert.svelte';
import { goto } from '$app/navigation';
import { setCookie } from '$lib/utils/common';

let username = $state('');
let password = $state('');
let alert: Alert | null = $state(null);

const login = async (event: Event) => {
  event.preventDefault();
  const res = await fetch('/login/check', {
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
    goto('/admin')
  } else {
    (alert as unknown as {showError: (m: string) => void })?.showError('Wrong username or password');
  }

}

</script>

<div class="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat">
    <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div class="text-white">
        <div class="mb-8 flex flex-row items-center">
          <img src="/images/blogLogo.svg" width="150" alt="login logo" srcset="" />
          <h1 class="text-2xl mx-2 uppercase text-amber-400 font-bold login-title">Login</h1>
        </div>
        <form action="#">
          <Alert bind:this={alert} />
          <div class="mb-4 text-lg flex justify-center">
            <input bind:value={username} class="rounded-3xl bg-zinc-900/80 border-none bg-opacity-50 px-6 py-2 text-amber-100 placeholder-slate-200 shadow-lg outline-hidden backdrop-blur-md" type="text" name="name" placeholder="username" />
          </div>
          <div class="mb-4 text-lg flex justify-center">
            <input  bind:value={password} class="rounded-3xl bg-zinc-900/80 border-none bg-opacity-50 px-6 py-2 text-amber-100 placeholder-slate-200 shadow-lg outline-hidden backdrop-blur-md" type="Password" name="name" placeholder="*********" />
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button onclick={(login)} type="submit" class="rounded-3xl bg-red-900 bg-opacity-80 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-700 cursor-pointer">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <style scoped>
    .login-title {
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-shadow: 3px 3px 30px rgb(160, 160, 160);
    }
  </style>