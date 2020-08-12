const puppeteer = require('puppeteer');
const iphone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(iphone);
  // Set User Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15'
  );
  await page.goto('https://duckduckgo.com');

  // type into #search_form_input_homepage
  await page.type('#search_form_input_homepage', 'what is my user agent?', {
    delay: 100,
  });

  // click #search_button_homepage
  await page.click('#search_button_homepage');

  await page.waitForSelector('.zci__body');

  const data = await page.evaluate(
    () => document.querySelector('.zci__body').innerHTML.split('\n')[0]
  );

  console.log(data);

  await page.screenshot({ path: 'ddgo.png' });

  // extract document.querySelector('.zci__body').innerText.split('\n');

  await browser.close();
})();
