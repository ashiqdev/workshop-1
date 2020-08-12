const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  //   title => h1
  //   details => p
  //   link => a
  const data = await page.evaluate(() => {
    return {
      title: document.querySelector('h1').innerText,
      details: document.querySelector('p').innerText,
      link: document.querySelector('a').href,
    };
  });
  // another way
  const titleElement = await page.$('h1');
  const title = await titleElement.evaluate((el) => el.innerText, titleElement);

  console.log(data);

  console.log({ title });

  await browser.close();
})();
