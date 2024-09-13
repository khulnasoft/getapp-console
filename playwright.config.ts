import { type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 120000,
    reportSlowTests: null,
    reporter: [['html', { open: 'never' }]],
    retries: 1,
    use: {
        baseURL: 'http://localhost:4173/console/',
        trace: 'on-first-retry'
    },
    webServer: {
        timeout: 120000,
        env: {
            PUBLIC_GETAPP_ENDPOINT: 'http://console-tests.appwrite.org/v1',
            PUBLIC_CONSOLE_MODE: 'cloud',
            PUBLIC_STRIPE_KEY:
                'pk_test_51LT5nsGYD1ySxNCyd7b304wPD8Y1XKKWR6hqo6cu3GIRwgvcVNzoZv4vKt5DfYXL1gRGw4JOqE19afwkJYJq1g3K004eVfpdWn'
        },
        command: 'pnpm run build && pnpm run preview',
        port: 4173
    }
};

export default config;
