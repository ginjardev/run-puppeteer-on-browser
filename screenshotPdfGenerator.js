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

    // set test status to passed
    await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: "Test Passed" } })}`);

    await browser.close();

    console.log('Browser closed.');
})();
