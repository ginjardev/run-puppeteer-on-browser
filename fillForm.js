import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
  browser: 'chrome',
  headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.lambdatest.com/selenium-playground/');

  // select Ajax Submit form Element
  await page.evaluate(() => {
    const element = document.querySelector('li.pt-10 > a[href="https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"]');
    element.click();
  });

  // wait for navigation
  await page.waitForNavigation()

  // select input and fill with text
  await page.type('input#title', 'Fill Text');

  // select textarea and fill with text
  await page.locator('textarea#description').fill('Sample Ekwe')

  // click submit button
  await page.locator('.btn').click();

  await browser.close();
})();