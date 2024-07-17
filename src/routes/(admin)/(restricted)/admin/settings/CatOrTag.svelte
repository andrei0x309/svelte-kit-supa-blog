<script lang="ts">
  import type { ICatTag } from '$lib/types/catTag';
  import { makeEmptyCatTag } from '$lib/utils/client/catTag';
  import Alert from '$lib/components/shared/Alert.svelte';
  import { onMount } from 'svelte';
  import { getParams } from '$lib/utils/client/misc';

  export let data = { catOrTag: makeEmptyCatTag() as ICatTag, notFound: false };
  const catOrTag: ICatTag = data.catOrTag as ICatTag;
  let alert: Alert;
  export let type = 'cat';

  const save = async () => {
    if (!catOrTag.name || !catOrTag.slug) {
      alert?.showError('Please fill required fields (name, slug)');
      return;
    }

    if (catOrTag.slug.match(/[^a-z0-9-\/]/g)) {
      alert?.showError('Slug can only contain lowercase letters, numbers, dashes and a slash optionally to set language eg: de/my-post');
      return;
    }

    catOrTag.type = type as 'cat';

    const res = await fetch('/admin/settings/cat-tag/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(catOrTag)
    });
    const data = await res.json();
    if (res.ok) {
      const updateId = data.updateId;
      window.location.href = `/admin/settings/${type === 'cat' ? 'categories' : 'tags'}/edit/${updateId}?saved=true`;
    } else {
      alert?.showError(data?.error || 'Something went wrong');
    }
  };

  onMount(() => {
    if (getParams('saved')) {
      const resource = type === 'cat' ? 'Category' : 'Tag';
      alert?.showSuccess(resource + ' saved successfully');
    }
  });
</script>

<div class="p-8 rounded border border-gray-200">
  {#if type === 'cat'}
    {#if data.catOrTag.id}
      <h1 class="font-medium text-3xl">Edit Category</h1>
    {:else}
      <h1 class="font-medium text-3xl">New Category</h1>
    {/if}
  {:else if type === 'tag'}
    {#if data.catOrTag.id}
      <h1 class="font-medium text-3xl">Edit Tag</h1>
    {:else}
      <h1 class="font-medium text-3xl">New Tag</h1>
    {/if}
  {/if}
  <Alert bind:this={alert} />
  <form>
    <div class="mt-8 space-y-6">
      <div>
        <label for="slug" class="text-sm text-gray-200 block mb-1 font-medium">Slug</label>
        <input
          type="text"
          id="slug"
          class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          placeholder="{`${type === 'cat'? 'cat slug' : 'tag slug'}`}"
          bind:value={catOrTag.slug}
        />
      </div>
      <div>
        <label for="name" class="text-sm text-gray-200 block mb-1 font-medium">Name</label>
        <input
          type="text"
          id="name"
          class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          placeholder="{`${type === 'cat'? 'cat slug' : 'tag slug'}`}"
          bind:value={catOrTag.name}
        />
      </div>
      <div>
        <label for="description" class="text-sm text-gray-200 block mb-1 font-medium">{`${type === 'cat'? 'Cat Description' : 'Tag Description'}`}</label>
        <textarea
          id="description"
          class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          placeholder="my description"
          bind:value={catOrTag.description}
        />
      </div>
      <div class="space-x-4 mt-8">
        <button
          type="submit"
          class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          on:click|preventDefault={() => {
            save();
          }}>Save</button
        >
        {#if type === 'cat'}
        <a href="/admin/settings/categories">
          <button
            class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >Cancel</button
          >
        </a>
        {:else}
        <a href="/admin/settings/tags">
          <button
            class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >Cancel</button
          >
        </a>
        {/if}
      </div>
    </div>
  </form>
</div>
