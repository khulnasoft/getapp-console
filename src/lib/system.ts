import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

export const enum Mode {
    CLOUD = 'cloud',
    SELF_HOSTED = 'self-hosted'
}

export const VARS = {
    CONSOLE_MODE: (env.PUBLIC_CONSOLE_MODE as Mode) ?? undefined,
    GETAPP_ENDPOINT: env.PUBLIC_GETAPP_ENDPOINT ?? undefined,
    GROWTH_ENDPOINT: env.PUBLIC_GROWTH_ENDPOINT ?? undefined,
    PUBLIC_STRIPE_KEY: env.PUBLIC_STRIPE_KEY ?? undefined
};

export const ENV = {
    DEV: dev,
    PROD: !dev,
    PREVIEW: import.meta.env?.VERCEL === '1',
    TEST: !!import.meta.env?.VITEST
};

export const MODE = VARS.CONSOLE_MODE === Mode.CLOUD ? Mode.CLOUD : Mode.SELF_HOSTED;
export const isCloud = MODE === Mode.CLOUD;
export const isSelfHosted = MODE !== Mode.CLOUD;
export const isDev = ENV.DEV;
export const isProd = ENV.PROD;
export const hasStripePublicKey = !!VARS.PUBLIC_STRIPE_KEY;
export const GRACE_PERIOD_OVERRIDE = false;
