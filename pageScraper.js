
const logger = require("./logger").Logger;

const scraperObject = {
    url: 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?acampID=0&cmp=RMX&loc=Hatch&ref=198&skuId=6429442',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);
        await page.waitForTimeout(5000);
        const AddToCartButtonText =  await page.$eval('.add-to-cart-button', el => el.innerText);
        const soldOut = AddToCartButtonText === 'Sold Out'
        console.log('is it sold out', soldOut, new Date().toISOString())
        if (!soldOut) {
            logger.info('The item is back in Stock')
        } else {
            logger.info('The item is still sold Out')
        }
        page.close();
    }
}

module.exports = scraperObject;