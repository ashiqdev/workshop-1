// Title
// const res  = [...document.querySelectorAll('.storylink')].map(el => el.innerText);

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/');
  //   title => .storylink
  //   nextbutton => .morelink
  const limit = 5;
  const nextLink = '.morelink';
  const titles = [];
  for (let i = 0; i < limit; i++) {
    const data = await page.evaluate(() => {
      return [...document.querySelectorAll('.storylink')].map(
        (el) => el.innerHTML
      );
    });
    console.log(i + 1, data);

    titles.push(...data);

    const isMoreExists = await page.evaluate(
      (nextLink) => !!document.querySelector(nextLink),
      nextLink
    );
    // click on next button
    if (isMoreExists && i < 5) {
      await page.click(nextLink);
    } else {
      break;
    }
  }

  console.log(titles.length);

  await browser.close();
})();
