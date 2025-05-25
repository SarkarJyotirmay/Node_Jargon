// ! STEPS =>
// 1. Install puppetier ✅
// 2. Open Browser ✅
// 3. Open Amazon ✅
// 4. Type Shoes ✅
// 5. Wait for the page to load
// 6. Extract data

import puppeteer from "puppeteer";
import fs from "node:fs"
// const path = require("node:path")

// const fileName = __dirname + "/" + "data.json"

try {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // open link
  await page.goto("https://www.amazon.in/", { waitUntil: "domcontentloaded" });

  // type product
  await page.type("#twotabsearchtextbox", "shoes under 2000 rs");

  // click on search
  await page.click("#nav-search-submit-button");

  // wait for the page to load results
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  //extract data
  const products = await page.evaluate(() => {
    const productCards = document.querySelectorAll(".puis-card-container");
    const productDetails = [];

    productCards.forEach((card) => {
      const brand = card.querySelector("h2 span")? card.querySelector("h2 span").innerText : ""

      const title = card.querySelector("a h2 span") ? card.querySelector("a h2 span").innerText : ""

      const price = card.querySelector(".a-price-whole") ? card.querySelector(".a-price-whole").innerText : ""

      const rating = card.querySelector(".a-icon-alt") ? card.querySelector(".a-icon-alt").innerText  : ""

      productDetails.push({ brand, title, price, rating });
    });

    return productDetails;
  });

  //
  // console.log(products);

  browser.close();

   fs.writeFileSync("data.json", JSON.stringify(products), ()=>{console.log("File created successfully");
   })
  console.log("Working fine");
} catch (error) {
  console.log("Error", error);
}
