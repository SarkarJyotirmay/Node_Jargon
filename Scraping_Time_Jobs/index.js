import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

import * as XLSX from 'xlsx';

try {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "https://m.timesjobs.com/mobile/jobs-search-result.html?jobsSearchCriteria=Information%20Technology&cboPresFuncArea=35",
    { waitUntil: "networkidle2" }
  );

  const jobs = await page.evaluate(()=>{
    let results = [];
    const allJobs = document.querySelectorAll(".srp-listing")
    allJobs.forEach((job)=>{
       const title =  job.querySelector(".srp-job-heading > h3 > a").innerText || ""
       const cpompany = job.querySelector(".srp-comp-name").innerText || "";
       const postTiming=  job.querySelector(".posting-time").innerText || "";
       const location = job.querySelector(".srp-loc").innerText || ""
       const experience = job.querySelector(".srp-exp").innerText || "";
       const skillsTags = Array.from(job.querySelector(".srp-keyskills").querySelectorAll(".srphglt")); // node list of a tag
        const skills = skillsTags.map((a)=>{
           return a.innerText
        }).join(" | ")

       if(title && cpompany && location){
        results.push({title, cpompany, experience, location, postTiming, skills})
       }
    })

    return results
  })

//   console.log(jobs);
  //   closing browser
  await browser.close();


// Excel setup
// 1. Convert JSON to worksheet
const worksheet = XLSX.utils.json_to_sheet(jobs);

// 2. Create a new workbook and append the worksheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Jpb Application Data");

// 3. Write the workbook to an Excel file
XLSX.writeFile(workbook, "job_application_data.xlsx");
  

  console.log("Working fine");
} catch (error) {
  console.log("Error loading page", error);
}
