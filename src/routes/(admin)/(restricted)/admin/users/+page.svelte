<script lang="ts">
    import Menu from "@/routes/(admin)/(restricted)/admin/menu.svelte";
    import type { ICurrentUser } from '$lib/types/user';

    export let data: {
        page: number
        hasNext: boolean
        users: ICurrentUser[] | null
    };
    console.log(data, 'tessss')
</script>

<div class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
    <div class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2">
        <Menu/>
        <div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
           
            <div id="last-users">
                <h1 class="font-bold py-4 uppercase">Users</h1>
                <div class="overflow-x-scroll text-[0.9rem]">
                    {#if data?.users}
                    <table class="w-full whitespace-nowrap">
                        <thead class="bg-black/60">
                            <th class="text-left py-3 px-2 rounded-l-lg">username</th>
                            <th class="text-left py-3 px-2">email</th>
                            <th class="text-left py-3 px-2">avatar</th>
                            <th class="text-left py-3 px-2">role</th>
                            <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
                        </thead>
                        {#each data.users as user}
                        <tr class="border-b border-gray-700">
                            <td class="py-3 px-2 font-bold  max-w-20 truncate">
                                <!-- <div class="inline-flex space-x-3 items-center">
                                    <span><img class="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt=""></span>
                                    <span>Thai Mei</span>
                                </div> -->
                                {user.username}
                            </td>
                            <td class="py-3 px-2 max-w-20 truncate">{user.email}</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex space-x-3 items-center">
                                    <img class="rounded-full w-10 h-10 relative object-cover" src="{user.avatar}" alt="">
                            </div></td>
                            <td class="py-3 px-2">{user.role}</td>
                            <td class="py-3 px-2">
                                <div class="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      </a>
                                    <a href="" title="Suspend user" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                      </svg>
                                      </a>
                                </div>
                            </td>
                        </tr>
                        {/each}
                        
                    </table>
                    {:else}
                    <div class="text-center py-4">
                        <p class="text-gray-500">No users in db</p>
                    </div>
                    {/if}

                </div>
                {#if data?.users}
                <div id="pagination" class="mb-2 mt-6 flex justify-end content-end w-full">
                    <span class="pt-2 pr-2">Page: <b>{data?.page}</b></span>
                    {#if data?.page > 1}
                    <a class="btn-pag" href="/admin/page/{data?.page - 1}">Prev</a>
                    {/if}
                    {#if data?.hasNext }
                    <a class="btn-pag" href="/admin/page/{data?.page + 1}">Next</a>
                    {/if}
                </div>
                {/if}

                <a class="btn-pag" href="/admin/users/add">
                    <svg class="inline-block" fill="currentColor" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve"><path d="M9,14c1.381,0,2.631-0.56,3.536-1.465C13.44,11.631,14,10.381,14,9s-0.56-2.631-1.464-3.535C11.631,4.56,10.381,4,9,4  S6.369,4.56,5.464,5.465C4.56,6.369,4,7.619,4,9s0.56,2.631,1.464,3.535C6.369,13.44,7.619,14,9,14z"/><path d="M9,21c3.518,0,6-1,6-2c0-2-2.354-4-6-4c-3.75,0-6,2-6,4C3,20,5.25,21,9,21z"/><path d="M21,12h-2v-2c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2v2c0,0.553,0.447,1,1,1s1-0.447,1-1  v-2h2c0.553,0,1-0.447,1-1S21.553,12,21,12z"/></svg>
                    Add New User</a>
                </div>
           
        </div>
    </div>
</div>

<style lang="scss">
    .btn-pag {
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin: 0 5px;
        border-radius: 5px;
        text-decoration: none;
    }
</style>