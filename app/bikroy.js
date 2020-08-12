const puppeteer = require('puppeteer');
const cookies = require('./cookies.json');

(async () => {
  const url = 'https://bikroy.com/';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto(url);
  await page.screenshot({ path: 'bikroy.png' });
  await browser.close();
})();
