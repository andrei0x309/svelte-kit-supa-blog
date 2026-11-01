<script lang="ts">
import { slide } from 'svelte/transition';
import Alert from '#/lib/components/shared/Alert.svelte';
import ConfirmModal from '#/lib/components/shared/ConfirmModal.svelte';
import AlreadySignedIcon from '#/routes/(admin)/(restricted)/admin/icons/AlreadySignedIcon.svelte';
import DeleteIcon from '#/routes/(admin)/(restricted)/admin/icons/DeleteIcon.svelte';
import EditIcon from '#/routes/(admin)/(restricted)/admin/icons/EditIcon.svelte';
import SignatureIcon from '#/routes/(admin)/(restricted)/admin/icons/SignatureIcon.svelte';
import Menu from '#/routes/(admin)/(restricted)/admin/menu.svelte';
import { modalOpen } from '#/stores/main.ts';
import type { IPost } from '#lib/types/post.ts';

let {
  data = $bindable()
}: {
  data: {
    page: number;
    hasNext: boolean;
    posts: IPost[] | null;
  };
} = $props();

let confirm = $state<ConfirmModal>();
let alert: Alert;

async function deletePost(slug: string) {
  try {
    if (!data.posts?.length) return;
    const res = await fetch(`/admin/posts/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
    });
    const reqData = await res.json();
    if (res.ok) {
      if (!reqData?.error) {
        alert.showSuccess('Post deleted successfully');
        if (data.posts?.length === 1 && data.page > 1) {
          location.href = `/admin/users/page/${data.page - 1}`;
        } else {
          data = {
            ...data,
            posts: data.posts.filter((p) => p.slug !== slug)
          };
        }
      } else {
        alert.showError(reqData?.error || 'Something went wrong');
      }
    } else {
      alert.showError(reqData?.error || 'Something went wrong');
    }
  } catch (err) {
    alert.showError('API network error');
  }
}

const sign = async (slug: string, confirmOveride = false) => {
  try {
    const postItem = data.posts?.find((p) => p.slug === slug);
    if (!postItem) {
      alert.showError('Post to sign not found');
      return;
    }
    if (typeof (window as any)?.ethereum === 'undefined') {
      alert.showError('Please install EVM compatible wallet Clear Wallet or MetaMask');
      return;
    }
    if (postItem.signature && !confirmOveride) {
      confirm?.setOkay(() => sign(slug, true));
      confirm?.show('Confirm', 'Post already signed, do you want to sign again and override the previous signature?');
      return;
    }

    const ethereum = (window as any).ethereum;
    let address: string;
    let dataToSign: string;
    let signature: string;
    try {
      address = await ethereum.request({ method: 'eth_requestAccounts' });
      dataToSign = `${postItem?.author?.username ?? 'Author' + ','} signed this post slug (${postItem.slug}) on ${new Date().toLocaleString()}`.toString();
      signature = await ethereum.request({
        method: 'personal_sign',
        params: [dataToSign, address[0]]
      });
    } catch (err) {
      alert.showError('User denied signing');
      return;
    }
    const res = await fetch(`/admin/posts/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug,
        signature: {
          address: address[0],
          data: dataToSign,
          signature
        }
      })
    });
    const reqData = await res.json();
    if (res.ok) {
      if (!reqData?.error) {
        alert.showSuccess('Post signed successfully');
        (data as any).posts = data.posts?.map((p) => {
          if (p.slug === slug) {
            return {
              ...p,
              signature: {
                address: address[0],
                data: dataToSign,
                signature
              }
            };
          }
          return p;
        });
      } else {
        alert.showError(reqData?.error || 'Something went wrong');
      }
    } else {
      alert.showError(reqData?.error || 'Something went wrong');
    }
  } catch (err) {
    alert.showError('API network error');
  }
};
</script>

<!-- 
<div id="24h">
    <h1 class="font-bold py-4 uppercase">Last 24h Statistics</h1>
    <div id="stats" class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-black/60 to-white/5 p-6 rounded-lg">
            <div class="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                </div>
                <div>
                    <p class="text-indigo-300 text-sm font-medium uppercase leading-4">Users</p>
                    <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                        <span>+28</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                              </svg>
                              
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="bg-black/60 p-6 rounded-lg">
            <div class="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      
                </div>
                <div>
                    <p class="text-teal-300 text-sm font-medium uppercase leading-4">Income</p>
                    <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                        <span>$2,873.88</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                              </svg>
                              
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="bg-black/60 p-6 rounded-lg">
            <div class="flex flex-row space-x-4 items-center">
                <div id="stats-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      
                </div>
                <div>
                    <p class="text-blue-300 text-sm font-medium uppercase leading-4">Invoices</p>
                    <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                        <span>+79</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                              </svg>
                              
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="last-incomes">
    <h1 class="font-bold py-4 uppercase">Last 24h incomes</h1>
    <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="bg-black/60 to-white/5 rounded-lg">
                <div class="flex flex-row items-center">
                    <div class="text-3xl p-4">💰</div>
                    <div class="p-2">
                        <p class="text-xl font-bold">348$</p>
                        <p class="text-gray-500 font-medium">Amber Gates</p>
                        <p class="text-gray-500 text-sm">24 Nov 2022</p>
                    </div>
                </div>
                <div class="border-t border-white/5 p-4">
                    <a href="#" class="inline-flex space-x-2 items-center text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                          </svg>
                          <span>Info</span>                                      
                    </a>
                </div>
        </div>
        <div class="bg-black/60 to-white/5 rounded-lg">
            <div class="flex flex-row items-center">
                <div class="text-3xl p-4">💰</div>
                <div class="p-2">
                    <p class="text-xl font-bold">68$</p>
                    <p class="text-gray-500 font-medium">Maia Kipper</p>
                    <p class="text-gray-500 text-sm">23 Nov 2022</p>
                </div>
            </div>
            <div class="border-t border-white/5 p-4">
                <a href="#" class="inline-flex space-x-2 items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      <span>Info</span>                                      
                </a>
            </div>
    </div>
    <div class="bg-black/60 to-white/5 rounded-lg">
        <div class="flex flex-row items-center">
            <div class="text-3xl p-4">💰</div>
            <div class="p-2">
                <p class="text-xl font-bold">12$</p>
                <p class="text-gray-500 font-medium">Oprah Milles</p>
                <p class="text-gray-500 text-sm">23 Nov 2022</p>
            </div>
        </div>
        <div class="border-t border-white/5 p-4">
            <a href="#" class="inline-flex space-x-2 items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <span>Info</span>                                      
            </a>
        </div>
</div>
<div class="bg-black/60 to-white/5 rounded-lg">
    <div class="flex flex-row items-center">
        <div class="text-3xl p-4">💰</div>
        <div class="p-2">
            <p class="text-xl font-bold">105$</p>
            <p class="text-gray-500 font-medium">Jonny Nite</p>
            <p class="text-gray-500 text-sm">23 Nov 2022</p>
        </div>
    </div>
    <div class="border-t border-white/5 p-4">
        <a href="#" class="inline-flex space-x-2 items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span>Info</span>                                      
        </a>
    </div>
</div>
<div class="bg-black/60 to-white/5 rounded-lg">
<div class="flex flex-row items-center">
    <div class="text-3xl p-4">💰</div>
    <div class="p-2">
        <p class="text-xl font-bold">52$</p>
        <p class="text-gray-500 font-medium">Megane Baile</p>
        <p class="text-gray-500 text-sm">22 Nov 2022</p>
    </div>
</div>
<div class="border-t border-white/5 p-4">
    <a href="#" class="inline-flex space-x-2 items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <span>Info</span>                                      
    </a>
</div>
</div>
<div class="bg-black/60 to-white/5 rounded-lg">
<div class="flex flex-row items-center">
<div class="text-3xl p-4">💰</div>
<div class="p-2">
    <p class="text-xl font-bold">28$</p>
    <p class="text-gray-500 font-medium">Tony Ankel</p>
    <p class="text-gray-500 text-sm">22 Nov 2022</p>
</div>
</div>
<div class="border-t border-white/5 p-4">
<a href="#" class="inline-flex space-x-2 items-center text-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
      <span>Info</span>                                      
</a>
</div>
</div>
    </div>
</div> -->

<div class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
  <div class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2">
    <Menu />
    <div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
      <Alert bind:this={alert} />
      <div id="posts">
        <h1 class="font-bold py-4 uppercase">Posts</h1>
        <div class="overflow-x-scroll text-[0.9rem]">
          {#if data?.posts}
            <table class="w-full whitespace-nowrap">
              <thead class="bg-black/60">
                <tr>
                  <th class="text-left py-3 px-2 rounded-l-lg">Slug</th>
                  <th class="text-left py-3 px-2">Title</th>
                  <th class="text-left py-3 px-2">Draft</th>
                  <th class="text-left py-3 px-2">F-Image</th>
                  <th class="text-left py-3 px-2">Category</th>
                  <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {#each data.posts as post (post.slug)}
                  <tr transition:slide class="border-b border-gray-700">
                    <td class="py-3 px-2 font-bold max-w-20 truncate">
                      <!-- <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt=""></span>
                                    <span>Thai Mei</span>
                                </div> -->
                      {post.slug}
                    </td>
                    <td class="py-3 px-2 max-w-24 truncate">{post.title}</td>
                    <td class="py-3 px-2 max-w-20 w-8 truncate">{post.draft ? 'Yes' : 'No'}</td>
                    <td class="py-3 px-2">
                      <div class="inline-flex space-x-3 items-center">
                        <img class="w-16 h-8 object-fit" src={post.feature_image || '/images/placeholder.svg'} alt="" />
                      </div></td
                    >
                    <td class="py-3 px-2">
                      {#if post?.cat?.name}
                        {post.cat.name}
                      {:else}
                        <span class="text-gray-500">No Category</span>
                      {/if}
                    </td>
                    <td class="py-3 px-2">
                      <div class="inline-flex items-center space-x-3">
                        <a href={`/admin/posts/edit/${post.slug}`} title="Edit" class="hover:text-white" aria-label="Edit"
                          >
                          <EditIcon class="w-5 h-5" />
                        </a>
                        <button onclick={() => sign(post.slug)} title="Sign" class="hover:text-white cursor-pointer">
                          {#if !post.signature}
                          <SignatureIcon class="w-5 h-5" />
                          {:else}
                          <AlreadySignedIcon class="w-5 h-5" />
                          {/if}
                        </button>
                        <button
                          onclick={() => {
                            confirm?.setOkay(() => {
                              deletePost(post.slug);
                            });
                            modalOpen.set(true);
                          }}
                          title="Delete Post"
                          class="hover:text-white cursor-pointer"
                          aria-label="Delete Post"
                        >
                          <DeleteIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
              <!-- <tr class="border-b border-gray-700">
                            <td class="py-3 px-2 font-bold">
                                <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt=""></span>
                                    <span>Thai Mei</span>
                                </div>
                            </td>
                            <td class="py-3 px-2">thai.mei@abc.com</td>
                            <td class="py-3 px-2">User</td>
                            <td class="py-3 px-2">Approved</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      </a>
                                    <a href="" title="Edit password" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                      </svg>
                                      </a>
                                    <a href="" title="Suspend user" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                      </a>
                                </div>
                            </td>
                        </tr>
                        <tr class="border-b border-gray-700">
                            <td class="py-3 px-2 font-bold">
                                <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt=""></span>
                                    <span>Thai Mei</span>
                                </div>
                            </td>
                            <td class="py-3 px-2">thai.mei@abc.com</td>
                            <td class="py-3 px-2">User</td>
                            <td class="py-3 px-2">Approved</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      </a>
                                    <a href="" title="Edit password" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                      </svg>
                                      </a>
                                    <a href="" title="Suspend user" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                      </a>
                                </div>
                            </td>
                        </tr>
                        <tr class="border-b border-gray-700">
                            <td class="py-3 px-2 font-bold">
                                <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/niCVbIBAm4hahzwS83HoEtcVEIactkKohOzgXWYY4lM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTk4ODczLmpwZw.jpg" alt=""></span>
                                    <span>Marquez Spineli</span>
                                </div>
                            </td>
                            <td class="py-3 px-2">marquez.spineli@cba.com</td>
                            <td class="py-3 px-2">User</td>
                            <td class="py-3 px-2">Approved</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      </a>
                                    <a href="" title="Edit password" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                      </svg>
                                      </a>
                                    <a href="" title="Suspend user" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                      </a>
                                </div>
                            </td>
                        </tr>
                        <tr class="border-b border-gray-800">
                            <td class="py-3 px-2 font-bold">
                                <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/f_xU7q780YXiKG7IwKVV05eU6Sj2nIodEkN1S8GyM2M/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk2MTc4LmpwZw.jpg" alt=""></span>
                                    <span>Mark Spike</span>
                                </div>
                            </td>
                            <td class="py-3 px-2">mark.spike@abc.com</td>
                            <td class="py-3 px-2">Administrator</td>
                            <td class="py-3 px-2">Approved</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      </a>
                                    <a href="" title="Edit password" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                      </svg>
                                      </a>
                                    <a href="" title="Suspend user" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                      </a>
                                </div>
                            </td>
                        </tr> -->
            </table>
            <ConfirmModal bind:this={confirm} />
          {:else}
            <div class="text-center py-4">
              <p class="text-gray-500">No posts in db</p>
            </div>
          {/if}
        </div>
        {#if data?.posts}
          <div id="pagination" class="mb-2 mt-6 flex justify-end content-end w-full">
            <span class="pt-2 pr-2">Page: <b>{data?.page}</b></span>
            {#if data?.page > 1}
              <a class="btn-pag" href="/admin/page/{data?.page - 1}">Prev</a>
            {/if}
            {#if data?.hasNext}
              <a class="btn-pag" href="/admin/page/{data?.page + 1}">Next</a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  /*$$__STYLE_CONTENT__$$*/
</style>
