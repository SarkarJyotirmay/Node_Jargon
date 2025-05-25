const { log } = require("node:console");
const fs = require("node:fs");

// Create a file
// fs.writeFile("myFirst.txt", "Hello Guys :)\nLet's start node.js", () => {
//   console.log("File create successfully");
// });

// append something new
// fs.appendFile(
//   "myFirst.txt",
//   "\nThis line is mounted using fs.appendFile method.",
//   () => {
//     console.log("new content appended successfully");
//   }
// );

// read file
// fs.readFile("myFirst.txt", (error, data)=>{
//     if(error){
//         console.log("Error is ",error.toString());
//         return;
//     }
//     console.log(data.toString());

// })

// ? Use functions to make code readable

// * Create a file

const createFile = (fileName, content, cbCreate) => {
  fs.writeFile(fileName, content, cbCreate);
};

const createLog = () => console.log("File created successflly.");
let createContent = "Hello this is second file.";

// createFile("mySecond.txt", createContent, createLog)

// * Read a file

const readMyFile = (fileName) => {
  let data;
  fs.readFile(fileName, (error, data) => {
    if (error) {
      console.log("Error is ", error);
      return;
    }
    data = data.toString();
    console.log(data);
  });
};

// readMyFile("mySecond.txt")

// * Updtae mySecond.txt replace Hello to Hi

// data = Hello this is second file. Ans.=> use replace method os string
// fs.readFile("mySecond.txt", (error, data) => {
//   if (error) {
//     console.log("Error", error);
//     return;
//   }
//   let myData = data.toString();
//   let myDataArr = myData.split(" ");
//   myDataArr.splice(0, 1, "Hi");
//   myData = myDataArr.join(" ");
//   console.log(myData);
//   fs.writeFile("mySecond.txt", myData, ()=>console.log("File updated!")
//   )
// });
fs.readFile("mySecond.txt", (error, data) => {
  if (error) {
    console.log("Error", error);
    return;
  }
  let myData = data.toString().split(" ");
   myData.splice(0,1,"Hi").join(" ")
  
  console.log(myData);
  // fs.writeFile("mySecond.txt", myData, ()=>console.log("File updated!")
  // )
});
