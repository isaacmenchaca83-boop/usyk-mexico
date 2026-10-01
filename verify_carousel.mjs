import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to animation section
await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }));
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/carousel_1.png' });

// Wait for auto-advance (3.5s)
await page.waitForTimeout(3800);
await page.screenshot({ path: '/tmp/carousel_2.png' });

// Wait for one more
await page.waitForTimeout(3800);
await page.screenshot({ path: '/tmp/carousel_3.png' });

await browser.close();
