<script lang="ts">
    import Menu from "@/routes/(admin)/(restricted)/admin/menu.svelte";
    import { onMount } from "svelte";
    import { makeEmptyPost } from '$lib/utils/client/posts';
    import Alert from "@/lib/components/shared/Alert.svelte";
    import type { IPost, ICat, ITag, IRelatedPost } from '$lib/types/post';
    import { currentUser } from '@/stores/main';
    import { schemas } from '$lib/types/post';
    import truncate from 'truncate-html'
    import { getParams } from '$lib/utils/client/misc';

    export let data = { post: makeEmptyPost() as IPost | null, notfound: false, cats: [] as ICat[], tags: [] as ITag[] };

    let postData: IPost = data.post as IPost
    let isEdit = !!postData

    if (!postData) {
        postData = makeEmptyPost();
    } else {
        try {
        postData.related = JSON.parse(postData?.related as unknown as string || '[]') as IRelatedPost[]
        } catch {
            // do nothing
        }
    }

    let cats = data.cats ?? [] as ICat[];
    let tags = data.tags ?? [] as ITag[];
    let manualSlugs = ''
    let relatedMechanism = 'tags'

    let alert : Alert & {
        showError: (m: string) => void
        showSuccess: (m: string) => void
    } | null = null;

    let alertRelated : Alert & {
        showError: (m: string) => void
        showSuccess: (m: string) => void
    } | null = null;

    let editor: HTMLElement
    let Jodit: any
    let JoditModule: any

    const goToAnchor = (anchor:string) => {
        const loc = document.location.toString().split('#')[0];
        document.location = `${loc}#${anchor}`;
    }


    onMount(async () => {
        if (data.notfound) {
            postData = makeEmptyPost();
        }
        JoditModule = (await import("jodit")).Jodit

        const buttons = [
        {
            name: 'source',
            icon: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><polygon points="28 19 28 11 26 11 26 21 32 21 32 19 28 19"/><polygon points="24 11 22 11 20.5 15 19 11 17 11 17 21 19 21 19 14 20.5 18 22 14 22 21 24 21 24 11"/><polygon points="9 13 11 13 11 21 13 21 13 13 15 13 15 11 9 11 9 13"/><polygon points="5 11 5 15 2 15 2 11 0 11 0 21 2 21 2 17 5 17 5 21 7 21 7 11 5 11"/></svg>'
        },   
        {
        name: 'empty',
        icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"/><path d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"/></svg>',
        exec: function (e: any) {
            const dialog = new JoditModule.modules.Dialog({
                theme: 'dark',
                resizable: false,
                draggable: false
            })
            const content = document.createElement('div')
            
            const innerContent = `<div class="mt-8 space-y-6">
						<div style="
                            display: flex;
                            flex-direction: column;
                            margin: 1rem; 
                        ">
							<label for="code-block-lang" style="margin-top:0.5rem;margin-bottom:0.5rem;font-size: 1.1rem"
                            >Language</label>
							<input
								type="text"
								id="code-block-lang"
								placeholder="language"
                                style="
                                width: 20rem;
                                background-color: #00000073;
                                padding: 0.5rem;
                                "
							/>
			</div>
		                    <div   style="
                            display: flex;
                            flex-direction: column;
                            margin: 1rem;"
                            >
							<label for="code-block-code" style="margin-top:0.5rem;margin-bottom:0.5rem;font-size: 1.1rem">Code</label>
							<textarea id="code-block-code" placeholder="code"
                            style="width: 100%;height: 60vh;
                            background-color: #00000073;
                            padding: 0.5rem;
                            "
                            ></textarea>
			</div>
            `
            content.innerHTML = innerContent
            dialog.setHeader('Insert Code Block');
            dialog.setContent(content);
            dialog.setSize('100%', '100%');
            dialog.setModal(true)

            JoditModule.modules.Helpers.css(editor, {
                width: '100%',
                height: '100%'
            })

            const but = document.createElement('button')
            but.style.fontSize = '1.3rem'
            but.style.border = '1px solid #ccc'
            but.style.padding = '0.3rem 3rem'
            but.style.margin = 'auto'
            but.style.marginBottom = '3rem'
            but.innerText = "Insert Code Block"

            but.addEventListener('click', async () => {
                const lang = (document.getElementById('code-block-lang') as any) .value
                const code = (document.getElementById('code-block-code') as any).value
                const highlightedCode = await highLightCodeBlocks(code, lang)
                if(!highlightedCode) {
                    alert?.showError("Unsuported language")
                    dialog.close()
                    return
                }
                const codeBlock = `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`
                e.selection.insertHTML(codeBlock)
                dialog.close()
            })

            dialog.setFooter([
                but
            ]);
            dialog.open();
        }
    },
    {name: 'fullsize'},
    {name: 'image'},
    {name: 'link'},
    {name: 'video'},
    {name: 'bold'},
    {name: 'strikethrough'},
    {name: 'underline'},
    {name: 'italic'},
    {name: 'superscript'},
    {name: 'subscript'},
    {name: 'selectall'},
    {name: 'paste'},
    {name: 'copy'},
    {name: 'cut'},
    {name: 'undo'},
    {name: 'redo'},
    {name: 'hr'},
    {name: 'ul'},
    {name: 'ol'},
    {name: 'outdent'},
    {name: 'indent'},
    {name: 'font'},
    {name: 'fontsize'},
    {name: 'brush'},
    {name: 'paragraph'},
    {name: 'print'},
    {name: 'table'},
    {name: 'left'},
    {name: 'center'},
    {name: 'right'},
    {name: 'justify'},
    ]

        Jodit = JoditModule.make(editor, {
            theme: 'a309',
            defaultLineHeight: 1.6,
            sourceEditorNativeOptions: {
                spellcheck: false,
                autocorrect: false,
                autocapitalize: false,
                autocomplete: false,
                theme: 'ace/theme/tomorrow_night'
            },
            toolbarButtonSize: 'large',

            buttons: buttons,
            buttonsMD: buttons,
            buttonsSM: buttons,
            buttonsXS: buttons,
            disablePlugins: ['table', 'iframe']
        })
        if(getParams('saved')) { 
            alert?.showSuccess("Post saved successfully");
        }
        if(!postData.draft) {
             const el = document.getElementById('draft-no') as HTMLInputElement
             el && (el.checked = true)
        } else {
            const el = document.getElementById('draft-yes') as HTMLInputElement
            el && (el.checked = true)
        }
    });

    const highLightCodeBlocks = async (code: string, lang: string) => {
        // const hljsUrl = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js"
        const hljs = (await import(/* @vite-ignore */'highlight.js/lib/core'/* @vite-ignore */)).default;
        if(!hljs.getLanguage(lang)){
            const langUrl = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/${lang}.min.js`;
            try {
                // const langPath = `highlight.js/es/languages/${lang}.js.js`.toString()
                const langModule = (await import(/* @vite-ignore */langUrl/* @vite-ignore */)).default;
                hljs.registerLanguage(lang, langModule);
            } catch (e) {
                return null
            }
        }
        return hljs.highlight(code, {language: lang}).value;
    }


    const save = async() => {
        postData.content = Jodit.value
        if (!postData.title || !postData.slug || !postData.content) {
            alert?.showError("Please fill required fields (title, slug, content)");
            return;
        }

        if(postData.slug.match(/[^a-z0-9-\/]/g)) {
            alert?.showError("Slug can only contain lowercase letters, numbers, dashes and a slash optionally to set language eg: de/my-post");
            return;
        }

        postData.slug = postData.slug.replace(/^\//, "").replace(/\/$/, "");

        postData.author_id = $currentUser?.id as number;

        const res = await fetch("/admin/posts/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (res.ok) {
            location.href = `/admin/posts/edit/${postData.slug}?saved=ok`;
        } else {
            const req = await res.json()
            alert?.showError(req?.error || "Something went wrong");
        }
    }

    const getRelated = async (slugs = false) => {
        let res
        if(!slugs) {
            res = await fetch(`/admin/posts/related`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({tags_id: postData.tags_id, slug: postData.slug})
        });
        } else {
            const inSlugs = manualSlugs.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0)
            res = await fetch(`/admin/posts/related/manual`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({slugs: inSlugs, slug: postData.slug})
            });
        }

        if (res.ok) {
            const req = await res.json()
            postData.related = (req?.relatedPosts?.res ?? []).map((r: any) => {
                return {
                    title: r.title,
                    slug: r.slug,
                    excerpt: truncate(r.content, 260, { stripTags: true }),
                    created_at: r.created_at,
                    feature_image: r.feature_image,
                    feature_image_alt: r.feature_image_alt,
                } as IRelatedPost
            })
            alertRelated?.showSuccess("Related posts linked");
        } else {
            const req = await res.json()
            alertRelated?.showError(req?.error || "Something went wrong");
        }
    }

</script>

<div id="top" class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
	<div
		class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2"
	>
		<Menu />
		<div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
			<div class="p-8 rounded border border-gray-200">
				<slot name="header">
                    <h1 class="font-medium text-3xl">New Post</h1>
                </slot>
                <Alert bind:this={alert} />
				<form>
					<div class="mt-8 space-y-6">
                        <div>
							<label for="title" class="text-sm text-gray-200 block mb-1 font-medium"
								>Title</label
							>
							<input
								type="text"
								id="title"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="My New Post"
                                bind:value={postData.title}
							/>
						</div>
						<div>
							<label for="slug" class="text-sm text-gray-200 block mb-1 font-medium">Slug</label>
							<input
								type="text"
								id="slug"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="post slug"
                                bind:value={postData.slug}
							/>
						</div>
                        {#if cats?.length > 0}
						<div>
							<label for="cats" class="text-sm text-gray-200 block mb-1 font-medium">Category</label
							>
                            <div id="cats" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 text-[0.9rem]">
							{#each cats as cat}
                            <button
                            on:click|preventDefault|capture={() => postData.cat_id = cat.id}
                            class="{`px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-40 items-center justify-center ${postData.cat_id === cat.id ? 'bg-gray-700/60 text-gray-100' : ''}`}">
                            {cat.name}

                            {#if postData.cat_id === cat.id}
                            <button on:click|stopPropagation={() => postData.cat_id = undefined} class="bg-transparent hover focus:outline-none hover:text-red-500">
                              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                class="w-3 ml-3" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 352 512">
                                <path fill="currentColor"
                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                                </path>
                              </svg>
                            </button>
                            {/if}
                          </button>
                            {/each}
                        </div>
						</div>
                        {/if}
                        <div>
							<label for="editor" class="text-sm text-gray-200 block mb-1 font-medium">Content</label
							>
							<textarea
                                bind:this={editor}
								id="editor"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder=""
                                bind:value={postData.content}
							></textarea>
						</div>
					</div>
                    <div>
                    <label for="fimage" class="text-sm text-gray-200 block mb-1 font-medium"
                    >Feature Image</label
                >
                    <input
                            type="text"
                            id="fimage"
                            class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="https://example.com/image.jpg"
                            bind:value={postData.feature_image}
                        />
                    </div>
                    <div>
                        <label for="fimage_alt" class="text-sm text-gray-200 block mb-1 font-medium"
                        >Feature Image Alt</label
                    >
                        <input
                                type="text"
                                id="fimage_alt"
                                class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                placeholder="This is my nice image"
                                bind:value={postData.feature_image_alt}
                            />
                        </div>
                    <div>
                        <label for="seo_description" class="text-sm text-gray-200 block mb-1 font-medium">Seo Description</label
                        >
                        <textarea
                            id="seo_description"
                            class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            placeholder="My nice seo description"
                            bind:value={postData.seo_description}
                        ></textarea>
                    </div>
                    {#if tags?.length > 0}
						<div>
							<label for="tags" class="text-sm text-gray-200 block mb-1 font-medium">Tags</label
							>
                            <div id="tags" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 text-[0.9rem]">
							{#each tags as tag}
                            <button
                            on:click|preventDefault|capture={() => postData.tags_id = [...new Set([...postData?.tags_id ?? [], tag.id])]}
                            class="{`px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-40 items-center justify-center ${postData.tags_id?.includes(tag.id) ? 'bg-gray-700/60 text-gray-100' : ''}`}">
                            {tag.name}

                            {#if postData.tags_id?.includes(tag.id)}
                            <button on:click|stopPropagation={() => postData.tags_id = postData.tags_id?.filter(t => t !== tag.id)} class="bg-transparent hover focus:outline-none hover:text-red-500">
                              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                class="w-3 ml-3" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 352 512">
                                <path fill="currentColor"
                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                                </path>
                              </svg>
                            </button>
                            {/if}
                          </button>
                            {/each}
                        </div>
						</div>
                        {/if}
                        <div class="radio-container">
                                <legend>&nbsp;&nbsp;Draft&nbsp;&nbsp;</legend>
                                <label for="draft-no" 
                                       class="input-label"
                                       on:click|capture={() => { postData.draft = false;}}
                                       on:keydown|capture={(e) => e.key === 'Enter' && (postData.draft = false)}
                                       >
                                  <input type="radio"
                                         value="false"
                                         name="draft"
                                         id="draft-no"/>
                                  <span>No</span>
                                </label>
                                <label for="draft-yes" 
                                       class="input-label"
                                        on:click|capture={() => { postData.draft = true; } }
                                        on:keydown|capture={(e) => e.key === 'Enter' && (postData.draft = true)}
                                       >
                                  <input type="radio" 
                                         value="true"
                                         name="draft" 
                                         id="draft-yes"/>
                                  <span>Yes</span>
                                </label>
                          </div>
                          <div>
                            <label for="schema" class="text-sm text-gray-200 block mb-1 font-medium">Schema</label
                            >
                            <span class="custom-dropdown">
								<select bind:value={postData.schema}>
                                    {#each schemas as schema}
									<option value="{schema}" >{schema}</option>
                                    {/each}
								</select>
							</span>
                        </div>
                  <div class="space-x-4 mt-8 border-related">
                    <Alert bind:this={alertRelated} />
                    <div class="radio-container">
                        <legend>Related Mechanism</legend>
                        <label for="related-tags" 
                               class="input-label"
                               on:click|capture={() => {
                                if(relatedMechanism === 'tags') return
                                relatedMechanism = 'tags'
                               }}
                               aria-hidden
                               >
                          <input type="radio"
                                 value="false"
                                 name="related"
                                 checked={relatedMechanism === 'tags'}
                                 id="related-tags"/>
                          <span>By Tags</span>
                        </label>
                        <label for="related-manual" 
                               class="input-label"
                               on:click|capture={() => {
                                if(relatedMechanism === 'manual') return
                                relatedMechanism = 'manual'
                               }}
                               aria-hidden
                               >
                          <input type="radio" 
                                 value="true"
                                 name="related" 
                                 checked={relatedMechanism === 'manual'}
                                 id="related-manual"/>
                          <span>Manual</span>
                        </label>
                  </div>    
                  {#if relatedMechanism === 'tags'}           
                  <button
                            type="button"
                            on:click|stopPropagation|capture={() => getRelated().then(
                               () => {
                                   console.log('related', postData.related)
                               }
                            )}
                                class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                                >Find & Link Related Posts
                                </button>
                {:else if relatedMechanism === 'manual'}
                <div class="flex flex-col">
                    <label for="related" class="text-sm text-gray-200 block mb-1 font-medium">Related Slugs</label
                    >
                    <input
                        type="text"
                        name="related"
                        id="related"
                        class="w-full border border-gray-200 rounded px-3 py-2 text-gray-900"
                        placeholder="Enter related slugs separated by commas"
                        bind:value={manualSlugs}
                    />
                    <button
                            type="button"
                            on:click|stopPropagation|capture={() => {
                                 getRelated(true).then(
                                    () => {
                                        console.log('related', postData.related)
                                    })
                            }}
                                class="py-2 px-4 mt-2 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                                >Link Related Posts
                                </button>
                </div>
                {/if}

                    
                            {#if postData.related?.length}
                            <p class="mt-2">Current Related Slugs:</p> 
                            <ul>
                            {#each postData.related as related}
                            <li>{related.slug}</li>
                            {/each}
                            </ul>
                            {/if}
                        </div>
					<div class="space-x-4 mt-8">
						<button
							type="submit"
							class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            on:click|preventDefault={() => {
                                goToAnchor('top')
                                save()
                            }}
							>Save</button
						>
						<a href="/admin">
						<button
							class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
							>Cancel</button
						>
                    </a>
					</div>
				</form>
			</div>

		</div>
	</div>
</div>

<style lang="scss">

.border-related {
    border-top: 1px solid #4a5568;
    border-bottom: 1px solid #4a5568;
    padding: 1rem 0;
}

.custom-dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  
}
.custom-dropdown select {
  background-color: #2c3e50;
  color: #fff;
  font-size: inherit;
  padding: .5em;
  padding-right: 2.5em;	
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: '';
  -webkit-appearance: none; /* hide default arrow in chrome OSX */
  -moz-appearance: none; /* hide default arrow in firefox */
  appearance: none;
  cursor: pointer;
}

.custom-dropdown::before,
.custom-dropdown::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.custom-dropdown::after { /*  Custom dropdown arrow */
  content: "\25BC";
  height: 1em;
  font-size: .625em;
  line-height: 1;
  right: 1.2em;
  top: 50%;
  margin-top: -.5em;
}

.custom-dropdown::before { /*  Custom dropdown arrow cover */
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 0 3px 3px 0;
}

.custom-dropdown::before {
  background-color: rgba(0,0,0,.15);
}

.custom-dropdown::after {
  color: #fff;
}

</style>