require('dotenv').config();
const nodemailer = require('nodemailer');
const URL = process.env.URL  || 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?acampID=0&cmp=RMX&loc=Hatch&ref=198&skuId=6429442'
const logger = require("./logger").Logger;
const sendFailureEmailTextMessage = process.env.SENDFAILURETEXT === true;

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    service: process.env.SERVICE,
    auth: {
      user: process.env.SMTPEMAILUSER,
      pass: process.env.SMTPEMAILPASS,
    }
  });

const scraperObject = {
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${URL}...`);
        await page.setDefaultNavigationTimeout(0);
        await page.goto(URL);
        await page.waitForTimeout(5000);
        const AddToCartButtonText =  await page.$eval('.add-to-cart-button', el => el.innerText);
        const soldOut = AddToCartButtonText === 'Sold Out'
        if (!soldOut) {

            const mailOptions = {
                from: process.env.FROMLIST,
                to: process.env.TOLIST,
                subject: 'EXCITED!!',
                text: 'THE RTX3070 is back in stock',
              };
        
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            console.log(`The item is still sold Out ${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`)
            logger.log('info', `The item is back in Stock ${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`)
        } else {
            const mailOptions = {
                from: process.env.FROMLIST,
                to: process.env.TOLIST,
                subject: 'out of stock',
                text: 'No Such luck'
              };
              sendFailureEmailTextMessage && transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            console.log(`The item is still sold Out ${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`)
            logger.log('info', `The item is still sold Out ${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`)
        }
        page.close();
    }
}

module.exports = scraperObject;