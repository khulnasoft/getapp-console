import { goto } from '$app/navigation';
import { sdk } from '$lib/stores/sdk';
import { project } from '$routes/(console)/project-[project]/store';
import { get } from 'svelte/store';
import type { Searcher } from '../commands';
import type { Models } from '@appwrite.io/console';
import { page } from '$app/stores';
import { showCreateDeployment } from '$routes/(console)/project-[project]/functions/function-[function]/store';
import { base } from '$app/paths';

const getFunctionCommand = (fn: Models.Function, projectId: string) => {
    return {
        label: fn.name,
        callback: () => {
            goto(`${base}/project-${projectId}/functions/function-${fn.$id}`);
        },
        group: 'functions',
        icon: 'lightning-bolt'
    } as const;
};

export const functionsSearcher = (async (query: string) => {
    const { functions } = await sdk.forProject.functions.list();

    const projectId = get(project).$id;

    const filtered = functions.filter((fn) => fn.name.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 1) {
        const func = filtered[0];
        return [
            getFunctionCommand(func, projectId),
            {
                label: 'Create deployment',
                nested: true,
                async callback() {
                    const $page = get(page);
                    if (!$page.url.pathname.endsWith(func.$id)) {
                        await goto(`${base}/project-${projectId}/functions/function-${func.$id}`);
                    }
                    showCreateDeployment.set(true);
                },
                group: 'functions',
                icon: 'plus'
            },
            {
                label: 'Go to deployments',
                nested: true,
                callback() {
                    goto(`${base}/project-${projectId}/functions/function-${func.$id}`);
                },
                group: 'functions'
            },
            {
                label: 'Go to usage',
                nested: true,
                callback() {
                    goto(`${base}/project-${projectId}/functions/function-${func.$id}/usage`);
                },
                group: 'functions'
            },
            {
                label: 'Go to executions',
                nested: true,
                callback() {
                    goto(`${base}/project-${projectId}/functions/function-${func.$id}/executions`);
                },
                group: 'functions'
            },
            {
                label: 'Go to settings',
                nested: true,
                callback() {
                    goto(`${base}/project-${projectId}/functions/function-${func.$id}/settings`);
                },
                group: 'functions'
            }
        ];
    }

    return filtered.map((fn) => getFunctionCommand(fn, projectId));
}) satisfies Searcher;
