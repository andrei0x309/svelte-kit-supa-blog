<script lang="ts">
import { slide } from 'svelte/transition';
import Alert from '#/lib/components/shared/Alert.svelte';
import ConfirmModal from '#/lib/components/shared/ConfirmModal.svelte';
import DeleteIcon from '#/routes/(admin)/(restricted)/admin/icons/DeleteIcon.svelte';
import EditIcon from '#/routes/(admin)/(restricted)/admin/icons/EditIcon.svelte';
import Menu from '#/routes/(admin)/(restricted)/admin/menu.svelte';
import { modalOpen } from '#/stores/main.ts';
import type { ICurrentUser } from '#lib/types/user.ts';

let confirm: ConfirmModal;
let alert: Alert;

export let data: {
  page: number;
  hasNext: boolean;
  users: ICurrentUser[] | null;
};

async function deleteUser(id: number) {
  try {
    if (!data.users?.length) return;
    const res = await fetch(`/admin/users/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    const reqData = await res.json();
    if (res.ok) {
      if (!reqData?.error) {
        alert.showSuccess('User deleted successfully');
        if (data.users?.length === 1 && data.page > 1) {
          location.href = `/admin/users/page/${data.page - 1}`;
        } else {
          data = {
            ...data,
            users: data.users.filter((user: ICurrentUser) => user.id !== id)
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
</script>

<div class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
  <div class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2">
    <Menu />
    <div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
      <div id="users">
        <h1 class="font-bold py-4 uppercase">Users</h1>
        <Alert bind:this={alert} />
        <div class="overflow-x-scroll text-[0.9rem]">
          {#if data?.users}
            <table class="w-full whitespace-nowrap">
              <thead class="bg-black/60">
                <tr>
                  <th class="text-left py-3 px-2 rounded-l-lg">username</th>
                  <th class="text-left py-3 px-2">email</th>
                  <th class="text-left py-3 px-2">avatar</th>
                  <th class="text-left py-3 px-2">role</th>
                  <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {#each data.users as user}
                  <tr transition:slide class="border-b border-gray-700">
                    <td class="py-3 px-2 font-bold max-w-20 truncate">
                      {user.username}
                    </td>
                    <td class="py-3 px-2 max-w-20 truncate">{user.email}</td>
                    <td class="py-3 px-2">
                      <div class="inline-flex space-x-3 items-center">
                        <img class="rounded-full w-10 h-10 relative object-cover" src={user.avatar} alt="" />
                      </div></td
                    >
                    <td class="py-3 px-2">{user.role}</td>
                    <td class="py-3 px-2">
                      <div class="inline-flex items-center space-x-3">
                        <a href={`/admin/users/edit/${user.id}`} title="Edit" class="hover:text-white" aria-label="Edit user"
                          ><EditIcon class="w-5 h-5" />
                        </a>

                        <a
                          onclick={() => {
                            confirm.setOkay(() => {
                              deleteUser(user.id);
                            });
                            modalOpen.set(true);
                          }}
                          href="#users"
                          title="Delete user"
                          class="hover:text-white"
                          aria-label="Delete user"
                          ><DeleteIcon class="w-5 h-5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
            <ConfirmModal bind:this={confirm}></ConfirmModal>
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
              <a class="btn-pag" href="/admin/users/page/{data?.page - 1}">Prev</a>
            {/if}
            {#if data?.hasNext}
              <a class="btn-pag" href="/admin/users/page/{data?.page + 1}">Next</a>
            {/if}
          </div>
        {/if}

        <a class="btn-pag" href="/admin/users/add">
          <svg
            class="inline-block"
            fill="currentColor"
            height="24px"
            id="Layer_1"
            version="1.2"
            viewBox="0 0 24 24"
            width="24px"
            xml:space="preserve"
            ><path
              d="M9,14c1.381,0,2.631-0.56,3.536-1.465C13.44,11.631,14,10.381,14,9s-0.56-2.631-1.464-3.535C11.631,4.56,10.381,4,9,4  S6.369,4.56,5.464,5.465C4.56,6.369,4,7.619,4,9s0.56,2.631,1.464,3.535C6.369,13.44,7.619,14,9,14z"
            /><path d="M9,21c3.518,0,6-1,6-2c0-2-2.354-4-6-4c-3.75,0-6,2-6,4C3,20,5.25,21,9,21z" /><path
              d="M21,12h-2v-2c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2v2c0,0.553,0.447,1,1,1s1-0.447,1-1  v-2h2c0.553,0,1-0.447,1-1S21.553,12,21,12z"
            /></svg
          >
          Add New User</a
        >
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  /*$$__STYLE_CONTENT__$$*/
</style>
