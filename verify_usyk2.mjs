import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Check actual rendered background of main container
const checks = await page.evaluate(() => {
  const mainDiv = document.querySelector('div.min-h-screen');
  const h1 = document.querySelector('h1');
  const accentElements = Array.from(document.querySelectorAll('*')).filter(el => {
    const c = window.getComputedStyle(el).color;
    return c.includes('196') && c.includes('149') && c.includes('122');
  });
  return {
    mainDivBg: mainDiv ? window.getComputedStyle(mainDiv).backgroundColor : 'not found',
    mainDivClass: mainDiv?.className?.substring(0, 100),
    h1Text: h1?.textContent?.trim(),
    accentElementCount: accentElements.length,
    accentSample: accentElements[0]?.tagName + ' ' + accentElements[0]?.className?.substring(0, 50),
    hasNavCotizar: !!document.querySelector('nav button'),
    formInputCount: document.querySelectorAll('input, textarea, select').length,
    svgIconCount: document.querySelectorAll('svg').length,
  };
});

console.log(JSON.stringify(checks, null, 2));
await browser.close();
