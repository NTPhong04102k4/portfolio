// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  workers: 4,
  retries: 1,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4173' },
  // Static site: any static server works. python ships with most dev machines.
  webServer: {
    command: 'python -m http.server 4173',
    url: 'http://localhost:4173/learn/index.html',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
});
