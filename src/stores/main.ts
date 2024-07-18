import { writable } from 'svelte/store';
import type { ICurrentUser } from '$lib/types/user';

export const isLoading = writable(false);
export const currentUser = writable(null as ICurrentUser | null);
export const modalOpen = writable(false);
export const theme = writable('dark');
