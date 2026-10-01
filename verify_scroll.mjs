import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll past hero/stats to reach the scroll animation section
await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/usyk_scroll_anim_start.png' });

// Scroll further into the animation
await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/usyk_scroll_anim_mid.png' });

// Check component exists
const hasScrollSection = await page.evaluate(() => {
  return !!document.querySelector('[style*="perspective"]');
});
const hasImage = await page.evaluate(() => {
  return !!document.querySelector('img[alt*="CNC"]');
});
console.log('ContainerScroll perspective element:', hasScrollSection);
console.log('Industrial image rendered:', hasImage);
await browser.close();
