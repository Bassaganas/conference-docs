import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  webServer: {
    command: 'npm start -- --host 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000/docs/intro/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
});