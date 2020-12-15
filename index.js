const cron = require('node-cron');
const browserObject = require('./browser');
const scraperController = require('./pageController');

console.log('The application is running, waiting for next cron check...')

cron.schedule('* * * * *', () => {
//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);

});
