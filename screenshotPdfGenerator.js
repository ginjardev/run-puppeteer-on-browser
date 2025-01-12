import { remoteBrowserPage } from "./connector.js";

(async () => {
    let { page, browser } = await remoteBrowserPage();

    console.log('Starting navigation');

    // Navigate the page to a URL
    await page.goto('https://www.lambdatest.com');

    // Take screenshot
    await page.screenshot({ path: 'lambdatest.png' });
    console.log('Screenshot taken!')

    // Generate PDF
    await page.pdf({ path: 'lambdatest.pdf' });
    console.log('PDF generated!')

    await browser.close();

    console.log('Browser closed.');
})();
