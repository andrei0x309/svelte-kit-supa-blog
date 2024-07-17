<script lang="ts">
    import Menu from "@/routes/(admin)/(restricted)/admin/menu.svelte";
    import { onMount } from "svelte";
	import { currentUser } from '@/stores/main'
	import Alert from "@/lib/components/shared/Alert.svelte";

    export let id: number | null = null;
    export let avatar: string | null = null;
    export let email: string | null = null;
    export let username: string | null = null;
    export let error = false;
	export let role = 'contribuitor';

	let password: string | null = null;
	let cpassword: string | null = null;

	let isEdit = !!id;


    let alert : Alert & {
        showError: (m: string) => void
        showSuccess: (m: string) => void
    } | null = null;

    const save = async () => {
        if (!username || !email || !avatar) {
            alert?.showError("Please fill all fields");
            return;
        }

		if (password && password !== cpassword) {
			alert?.showError("Passwords do not match");
			return;
		}
        
        const update = {
            ...(id && { id }),
            ...(username && { username }),
            ...(email && { email }),
            ...(avatar && { avatar }),
			...(password && { password }),
			...(role && { role }),
        }

        const res = await fetch("/admin/users/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        });
        if (res.ok) {
            location.href = "/admin/users";
        } else {
            const req = await res.json()
            alert?.showError(req?.error || "Something went wrong");
        }
    };
    
    onMount(async () => {
        if (error) {
            alert?.showError("User not found");
        }
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
							<label for="username" class="text-sm text-gray-200 block mb-1 font-medium">Username
								{#if !isEdit}
								<small class="text-gray-400">Required</small>
								{/if}	</label>
							<input
								type="text"
								id="username"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="username"
                                bind:value={username}
								disabled={isEdit && username === $currentUser?.username }
							/>
						</div>
						<div>
							<label for="title" class="text-sm text-gray-200 block mb-1 font-medium"
								>Email
								{#if !isEdit}
								<small class="text-gray-400">Optional</small>
								{/if}	
								</label
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
							<label for="fimage" class="text-sm text-gray-200 block mb-1 font-medium">Avatar Url 
							{#if !isEdit}
							<small class="text-gray-400">Optional</small>
							{/if}	
							</label
							>
							<input
								type="text"
								id="fimage"
								class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
								placeholder="https://example.com/image.jpg"
                                bind:value={avatar}
							/>
						</div>
						<div>
							{#if isEdit}
							<label for="fpassword" class="text-sm text-gray-200 block mb-1 font-medium">Password</label
							>
							<small class="block mb-1">Leave <u>blank</u> if you don't want to <u>change it</u></small>
							<input
							type="text"
							id="fpassword"
							class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
							placeholder="update password"
							bind:value={password}
							/>
							<input
							type="text"
							id="cpassword"
							class="mt-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
							placeholder="confirm password"
							bind:value={cpassword}
							>
							{:else}
							<label for="fpassword" class="text-sm text-gray-200 block mb-1 font-medium">Password
							<small class="text-gray-400">Required</small></label
							>
							<small class="block mb-1">After a password is set you can only change it and not <u>recover</u> it.</small>
							<input
							type="text"
							id="fpassword"
							class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
							placeholder="password"
							bind:value={password}
							>
							<input
							type="text"
							id="cpassword"
							class="mt-2 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
							placeholder="confirm password"
							bind:value={cpassword}
							>
							{/if}
						</div>
						<div>
							<label for="fimage" class="text-sm text-gray-200 block mb-1 font-medium">Role
							<span class="custom-dropdown">
								<select bind:value={role}>
									<option value="admin" >Admin</option>
									<option value="contribuitor">Contribuitor</option>  
								</select>
							</span>
							<small class="text-gray-400">Default: Contribuitor</small>
						</div>
					</div>
					<div class="space-x-4 mt-8">
						<button
							type="submit"
							class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            on:click|preventDefault={save}
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

<style lang="scss">
 
input:disabled {
	  background-color: #2c3e50;
  	  color: #fff;
	  opacity: 0.5;
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