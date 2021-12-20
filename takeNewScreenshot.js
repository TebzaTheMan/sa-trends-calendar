const puppeteer = require('puppeteer');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./firebase/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'sa-trends-calendar.appspot.com'
});

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1025 });
    await page.goto('http://localhost:3000/en/year/2021');
    await page.evaluate(() => {
        let logo = document.querySelector('.css-70qvj9');
        let madeWithText = document.getElementsByClassName('css-70qvj9')[2];
        let copyrightText = document.querySelector('.css-zm3ud3');
        let nav = document.querySelector('.css-ajfj5u');
        let NavBtns = document.querySelectorAll('.css-1m9bns0');
      
        nav.replaceChild(logo, nav.childNodes[0]);
 
        for (i = 0; i < NavBtns.length; i++){
            NavBtns[i].parentNode.removeChild(NavBtns[i]);
        }
        madeWithText.parentNode.removeChild(madeWithText);  
        
        copyrightText.innerHTML = "fresh copy of the calendar downloaded at https://sacalendar.vercel.app";
    });
   await page.screenshot({ path: 'screenshot.jpg', clip: { x: 0, y: 50, width: 1440, height: 937 } });
   await browser.close();
   console.log('screenshot captured successfully');
}

async function uploadImage() {
  try {
     const bucket = getStorage().bucket();
     await bucket.upload("screenshot.jpg", {
        destination: "calendar-screenshots/2021.jpg",
    });
  console.log('screenshot successfully uploaded!');
  } catch (error) {
    console.log(error.message)
  }
}

async function run() {
  await takeScreenshot();
  await uploadImage();
}

run();