'use strict';

import { remoteBrowserPage } from './connector.js';

(async () => {
   
    try {
       
        let {page, browser} = await remoteBrowserPage();

        console.log("Navigating to LambdaTest eCommerce Playground");
        await page.goto('https://ecommerce-playground.lambdatest.io/');

        // show dropdown menu 
        await page.evaluate(() => {
            const element = document.querySelector('ul.mz-sub-menu-28.dropdown-menu.mega-menu-content.full-width');
            if (element) {
                // Add the "show" class
                element.classList.add('show'); 
            }
        });

        // click on the apple category
        await page.click('a.nav-link.icon-left.text[title="Apple"]');

        // wait for element to load
        await page.waitForSelector('div.carousel-item.active img.lazy-load');

        // scroll down to load images
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;

                // Scroll distance per interval
                const distance = 50;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                    // Scroll every 100ms
                }, 100);
            });
        });

        // Extract all src attribute values
        const imgSrcs = await page.evaluate(() => {
            const imgElements = document.querySelectorAll('div.carousel-item.active img.lazy-load');
            return Array.from(imgElements).map(img => img.src); 
        });

        // Wait for the elements to load
        await page.waitForSelector('div.caption h4.title');
        await page.waitForSelector('div.caption div.price');

        // Extract innerTexts from title elements
        const titles = await page.evaluate(() => {
            const titleElements = document.querySelectorAll('div.caption h4.title');
            return Array.from(titleElements).map(title => title.innerText.trim());
        });

        // Extract innerTexts from price elements
        const prices = await page.evaluate(() => {
            const priceElements = document.querySelectorAll('div.caption div.price');
            return Array.from(priceElements).map(price => price.innerText.trim());
        });


        // Combine the lists into a structured object
        const combined = imgSrcs.map((src, index) => ({
            image: src,
            title: titles[index],
            price: prices[index]
        }));

        // Print the combined result
        console.log(combined);

        // set test status to passed
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: "Test Passed" } })}`);

        console.log("Closing browser");
        await browser.close();

    } catch (e) {
        console.log("Error - ", e);
    }
})();
