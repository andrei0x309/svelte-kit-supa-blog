<script lang="ts">
import { slide } from 'svelte/transition';
import { modalOpen } from '@/stores/main';
import type { ICatTag } from '@/lib/types/catTag'
import type ConfirmModal from '@/lib/components/shared/ConfirmModal.svelte';


export let data: { catOrTags: ICatTag[]} & { notFound: boolean } = { catOrTags: [], notFound: false }
export let confirm: ConfirmModal
export let deleteFn = (id: number) => {} 
export let type = 'cat'

</script>

<div>
    <h1 class="font-bold py-4 uppercase">{ type === 'cat' ? 'Categories' : 'Tags' }

        {#if type === 'cat'}
        <a href="/admin/settings/categories/add" title="Add">
            <button class="btn btn-primary btn-pag">Add</button>
        </a>
        {:else if type === 'tag'}
        <a href="/admin/settings/tags/add" title="Add">
            <button class="btn btn-primary btn-pag">Add</button>
        </a>
        {/if}
    </h1>
    <slot name="alert" >
    </slot>
    <div class="overflow-x-scroll text-[0.9rem]">
        {#if data?.catOrTags.length}
        <table class="w-full whitespace-nowrap">
            <thead class="bg-black/60">
                <th class="text-left py-3 px-2 rounded-l-lg">Name</th>
                <th class="text-left py-3 px-2">Slug</th>
                <th class="text-left py-3 px-2">Post Count</th>
                <th class="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </thead>
            {#each data.catOrTags as cot}
            <tr transition:slide class="border-b border-gray-700">
                <td class="py-3 px-2 max-w-20 truncate">
                    {cot.name}
                </td>
                <td class="py-3 px-2 max-w-20 truncate">{cot.slug}</td>
                <td class="py-3 px-2 max-w-20 truncate">{cot.posts?.[0]?.count ?? cot.count ?? 0}</td>
                <td class="py-3 px-2">
                    <div class="inline-flex items-center space-x-3">
                        <a href="{`/admin/settings/${type === 'cat' ? 'categories': 'tags'}/edit/${cot.id}`}" title="Edit" class="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                        <button on:click={() => {
                            confirm.setOkay(() => {
                                deleteFn(cot.id)
                            })
                            modalOpen.set(true)
                        }} title="Delete Post" class="hover:text-white">
                            <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z"/><path d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z"/></g></svg>
                          </button>
                    </div>
                </td>
            </tr>
            {/each}
            
        </table>
        <slot name="confirm" >
        </slot>
        {:else}
        <div class="text-center py-4">
            <p class="text-gray-500">{ type === 'cat' ? 'No categories in db' : 'No tags in db' }</p>
        </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .btn-pag {
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin: 0 5px;
        border-radius: 5px;
        text-decoration: none;
        display: inline-block;
    }
</style>
