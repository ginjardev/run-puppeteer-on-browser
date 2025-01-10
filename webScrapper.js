import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    browser: 'chrome',
    headless: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  //   await page.waitForNavigation()


  //   await page.hover('a.nav-link.dropdown-toggle[href*="information_id=4"]');
  // await page.hover('li.nav-item.dropdown.dropdown-hoverable.mega-menu.position-static');
  await page.evaluate(() => {
    const element = document.querySelector('ul.mz-sub-menu-28.dropdown-menu.mega-menu-content.full-width');
    if (element) {
      element.classList.add('show'); // Add the "show" class
    }
  });

  await page.click('a.nav-link.icon-left.text[title="Apple"]');
  // await page.waitForNavigation()
  // Wait for the <img> element to load
  // Wait for the image elements to load
  await page.waitForSelector('div.carousel-item.active img.lazy-load');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 50; // Scroll distance per interval
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // Scroll every 100ms
    });
  });

  // Extract all src attribute values
  const imgSrcs = await page.evaluate(() => {
    const imgElements = document.querySelectorAll('div.carousel-item.active img.lazy-load');
    return Array.from(imgElements).map(img => img.src); // Extract src attribute from each img element
  });

  // console.log('Image SRCs:', imgSrcs);

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

  //  console.log('Titles:', titles);
  //  console.log('Prices:', prices);


  // Combine the lists into a structured object
  const combined = imgSrcs.map((src, index) => ({
    image: src,
    title: titles[index],
    price: prices[index]
  }));

  // Print the combined result
  console.log(combined);


  await browser.close();
})();