<script lang="ts">
import Settings from '#/routes/(admin)/(restricted)/admin/settings/Settings.svelte';
import Tabs from '#/routes/(admin)/(restricted)/admin/settings/Tabs.svelte';
import { tabs } from '#/routes/(admin)/(restricted)/admin/settings/tabs.ts';
import type { PageProps } from './$types';

let { form }: PageProps = $props();
</script>

<Settings>
  {#snippet content()}
    <Tabs {tabs} activeTab="Cache bust">
      {#snippet content()}
        <div class="space-y-6">
          <div>
            <h2 class="mb-2 text-xl font-semibold">Cache bust</h2>
            <p class="text-slate-400">
              Refresh cached site content. Busting all caches refreshes the tag cloud and Goodreads widget and invalidates
              the sitemap, which is regenerated on its next request.
            </p>
          </div>

          {#if form?.message}
            <p
              role={form.success ? 'status' : 'alert'}
              class={form.success ? 'text-green-400' : 'text-red-400'}
            >
              {form.message}
            </p>
          {/if}

          <div class="flex flex-wrap gap-3">
            <form method="POST" action="?/all">
              <button
                type="submit"
                class="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-zinc-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 active:translate-y-px active:bg-zinc-700"
              >
                Bust all caches
              </button>
            </form>
            <form method="POST" action="?/tagCloud">
              <button
                type="submit"
                class="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-zinc-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 active:translate-y-px active:bg-zinc-700"
              >
                Bust tag cloud cache
              </button>
            </form>
            <form method="POST" action="?/goodReads">
              <button
                type="submit"
                class="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-zinc-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 active:translate-y-px active:bg-zinc-700"
              >
                Bust Goodreads cache
              </button>
            </form>
            <form method="POST" action="?/sitemap">
              <button
                type="submit"
                class="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-zinc-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 active:translate-y-px active:bg-zinc-700"
              >
                Bust sitemap cache
              </button>
            </form>
          </div>
        </div>
      {/snippet}
    </Tabs>
  {/snippet}
</Settings>
