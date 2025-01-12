import { remoteBrowserPage } from "./connector.js";

(async () => {
  // Launch the browser and open a new blank page
  let {page, browser} = await remoteBrowserPage();

  console.log("starting navigation");

  // Navigate the page to a URL
  await page.goto('https://www.lambdatest.com/selenium-playground/');

  // select Ajax Submit form Element
  await page.evaluate(() => {
    const element = document.querySelector('li.pt-10 > a[href="https://www.lambdatest.com/selenium-playground/ajax-form-submit-demo"]');
    element.click();
  });

  // wait for navigation
  await page.waitForNavigation();

  // select input and fill with text
  await page.type('input#title', 'John Doe');

  // select textarea and fill with text
  await page.locator('textarea#description').fill('I need customer support');

  // click submit button
  await page.locator('.btn').click();

  console.log('Form submitted');

  await browser.close();

  console.log("closing browser");
})();