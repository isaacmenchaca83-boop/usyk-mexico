import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/usyk_turbine.png' });
await browser.close();
