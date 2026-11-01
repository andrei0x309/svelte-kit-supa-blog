<script lang="ts">
import type { Snippet } from 'svelte';
import { slide } from 'svelte/transition';
import ConfirmModal from '#/lib/components/shared/ConfirmModal.svelte';
import type { ICatTag } from '#/lib/types/catTag.ts';
import DeleteIcon from '#/routes/(admin)/(restricted)/admin/icons/DeleteIcon.svelte';
import EditIcon from '#/routes/(admin)/(restricted)/admin/icons/EditIcon.svelte';
import { modalOpen } from '#/stores/main.ts';

interface Props {
  data?: { catOrTags: ICatTag[]; notFound: boolean };
  deleteFn?: (id: number) => void | Promise<void>;
  type?: 'cat' | 'tag';
  alert?: Snippet;
}

let {
  data = { catOrTags: [], notFound: false },
  deleteFn = () => {
    return;
  },
  type = 'cat',
  alert
}: Props = $props();

let confirmRef = $state<ConfirmModal>();

const section = $derived(type === 'cat' ? 'categories' : 'tags');

const askDelete = (id: number) => {
  confirmRef?.setOkay(() => {
    deleteFn(id);
  });
  modalOpen.set(true);
};
</script>

<div>
  <h1 class="font-bold py-4 uppercase">
    {type === 'cat' ? 'Categories' : 'Tags'}
    <a href="/admin/settings/{section}/add" title="Add" class="btn btn-primary btn-pag">Add</a>
  </h1>

  {@render alert?.()}

  <div class="overflow-x-auto text-[0.9rem]">
    {#if data.catOrTags.length}
      <table class="w-full whitespace-nowrap">
        <thead class="bg-black/60">
          <tr>
            <th class="text-left py-3 px-2 rounded-l-lg">Name</th>
            <th class="text-left py-3 px-2">Slug</th>
            <th class="text-left py-3 px-2">Post Count</th>
            <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each data.catOrTags as cot (cot.id)}
            <tr transition:slide class="border-b border-gray-700">
              <td class="py-3 px-2 max-w-20 truncate">{cot.name}</td>
              <td class="py-3 px-2 max-w-20 truncate">{cot.slug}</td>
              <td class="py-3 px-2 max-w-20 truncate">{cot.posts?.[0]?.count ?? cot.count ?? 0}</td>
              <td class="py-3 px-2">
                <div class="inline-flex items-center space-x-3">
                  <a
                    href="/admin/settings/{section}/edit/{cot.id}"
                    title="Edit"
                    class="hover:text-white"
                    aria-label="Edit"
                  >
                    <EditIcon class="w-5 h-5" />
                  </a>
                  <button
                    type="button"
                    onclick={() => askDelete(cot.id)}
                    title="Delete"
                    class="hover:text-white"
                    aria-label="Delete"
                  >
                  <DeleteIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <div class="text-center py-4">
        <p class="text-gray-500">{type === 'cat' ? 'No categories in db' : 'No tags in db'}</p>
      </div>
    {/if}
  </div>
</div>

<ConfirmModal bind:this={confirmRef} />