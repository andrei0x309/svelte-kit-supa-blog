<script lang="ts">
    import Menu from "@/routes/(admin)/(restricted)/admin/menu.svelte";
    import { onMount } from "svelte";
    export let avatar: string | null = null;
    export let email: string | null = null;
    export let username: string | null = null;

    import Alert from "@/lib/components/shared/Alert.svelte";

    let alert : Alert & {
        showError: (m: string) => void
        showSuccess: (m: string) => void
    } | null = null;

    const save = async () => {
        const res = await fetch("/api/admin/users/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                avatar,
            }),
        });
        if (res.ok) {
            location.href = "/admin/users";
        } else {
            const req = await res.json()
            alert?.showError(req?.error || "Something went wrong");
        }
    };
    
    onMount(async () => {
 
    });

</script>
<div class="antialiased bg-[#0000009c] w-full min-h-screen text-slate-300 relative py-4">
	<div
		class="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-8xl my-10 px-2"
	>
		<Menu />
		<div id="content" class="bg-white/6 col-span-9 rounded-lg p-6">
			<div class="p-8 rounded border border-gray-200">
				<slot name="header">
                    <h1 class="font-medium text-3xl">New User</h1>
                </slot>
                <Alert bind:this={alert} />
				<form>
					<div class="mt-8 space-y-6">
						<div>
							<label for="slug" class="text-sm text-gray-200 block mb-1 font-medium">Username</label>
							<input
								type="text"
								id="slug"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="username"
                                bind:value={username}
							/>
						</div>
						<div>
							<label for="title" class="text-sm text-gray-200 block mb-1 font-medium"
								>email</label
							>
							<input
								type="text"
								id="title"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="email"
                                bind:value={email}
							/>
						</div>
						<div>
							<label for="fimage" class="text-sm text-gray-200 block mb-1 font-medium">avatar</label
							>
							<input
								type="text"
								id="fimage"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="https://example.com/image.jpg"
                                bind:value={avatar}
							/>
						</div>
					</div>
					<div class="space-x-4 mt-8">
						<button
							type="submit"
							class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
							>Save</button
						>
						<a href="/admin/users">
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
