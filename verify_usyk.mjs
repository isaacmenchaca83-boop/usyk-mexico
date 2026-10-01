import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/usyk_hero.png' });

await page.evaluate(() => document.getElementById('soluciones')?.scrollIntoView());
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/usyk_soluciones.png' });

await page.evaluate(() => document.getElementById('contacto')?.scrollIntoView());
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/usyk_contacto.png' });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/usyk_full.png', fullPage: true });

const bodyText = await page.textContent('body');
const emojiRegex = /[\u{1F300}-\u{1FAFF}]/gu;
const emojis = bodyText?.match(emojiRegex);

const checks = await page.evaluate(() => ({
  heroText: document.querySelector('h1')?.textContent?.trim(),
  solucionesExists: !!document.getElementById('soluciones'),
  contactoExists: !!document.getElementById('contacto'),
  bgColor: window.getComputedStyle(document.body).backgroundColor,
  fontFamily: window.getComputedStyle(document.body).fontFamily.substring(0, 80),
  navbarText: document.querySelector('nav')?.textContent?.trim().substring(0, 80),
}));

console.log('Emojis found:', emojis?.length ?? 0, emojis);
console.log('Checks:', JSON.stringify(checks, null, 2));
await browser.close();
