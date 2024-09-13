import { Dependencies } from '$lib/constants';
import { sdk } from '$lib/stores/sdk';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends }) => {
    depends(Dependencies.FUNCTIONS);

    return {
        template: await sdk.forProject.functions.getTemplate(params.template),
        functions: await sdk.forProject.functions.list()
    };
};
