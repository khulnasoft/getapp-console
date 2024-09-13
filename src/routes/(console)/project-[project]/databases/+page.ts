import { CARD_LIMIT, Dependencies } from '$lib/constants';
import { getLimit, getPage, getView, pageToOffset, View } from '$lib/helpers/load';
import { sdk } from '$lib/stores/sdk';
import { Query } from '@appwrite.io/console';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, route, depends }) => {
    depends(Dependencies.DATABASES);
    const page = getPage(url);
    const limit = getLimit(url, route, CARD_LIMIT);
    const view = getView(url, route, View.Grid);
    const offset = pageToOffset(page, limit);

    return {
        offset,
        limit,
        view,
        databases: await sdk.forProject.databases.list([
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc('')
        ])
    };
};
