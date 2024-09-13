import { Query } from '@appwrite.io/console';
import { sdk } from '$lib/stores/sdk';
import { getLimit, getPage, getSearch, pageToOffset } from '$lib/helpers/load';
import { Dependencies, PAGE_LIMIT } from '$lib/constants';
import type { PageLoad } from './$types';
import { isCloud } from '$lib/system';

export const load: PageLoad = async ({ params, depends, url, route, parent }) => {
    const { organization } = await parent();
    depends(Dependencies.FILES);
    const page = getPage(url);
    const search = getSearch(url);
    const limit = getLimit(url, route, PAGE_LIMIT);
    const offset = pageToOffset(page, limit);

    const [files, organizationUsage] = await Promise.all([
        sdk.forProject.storage.listFiles(
            params.bucket,
            [Query.limit(limit), Query.offset(offset), Query.orderDesc('')],
            search
        ),
        isCloud && organization?.$id ? sdk.forConsole.billing.listUsage(organization.$id) : null
    ]);
    return {
        offset,
        limit,
        search,
        files,
        organizationUsage
    };
};
