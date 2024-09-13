import type { Models } from '@appwrite.io/console';
import { writable } from 'svelte/store';

export const log = writable<{
    show: boolean;
    func: Models.Function;
    data: Models.Execution;
}>({
    show: false,
    func: null,
    data: null
});
