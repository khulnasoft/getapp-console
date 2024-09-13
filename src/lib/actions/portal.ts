import { tick } from 'svelte';
import type { Action } from 'svelte/action';

export type PortalConfig = string | HTMLElement | undefined;

export const portal: Action<HTMLElement, PortalConfig> = (el, target = 'body') => {
    let targetEl;

    async function update(newTarget: PortalConfig) {
        target = newTarget;
        if (typeof target === 'string') {
            targetEl = document.querySelector(target);
            if (targetEl === null) {
                await tick();
                targetEl = document.querySelector(target);
            }
            if (targetEl === null) {
                throw new Error(`No element found matching css selector: "${target}"`);
            }
        } else if (target instanceof HTMLElement) {
            targetEl = target;
        } else {
            throw new TypeError(
                `Unknown portal target type: ${
                    target === null ? 'null' : typeof target
                }. Allowed types: string (CSS selector) or HTMLElement.`
            );
        }
        targetEl.appendChild(el);
        el.hidden = false;
    }

    function destroy() {
        el.remove();
    }

    update(target);
    return {
        update,
        destroy
    };
};
