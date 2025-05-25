// To Do:
// 1. CRUD ==> simple from Day 1 ✅ 
// 2. use fs.exists(pathname) ✅ 
// 3. path.join() + __dirname + __filename ✅ 
// 4. Third party module = node-wifi ✅ 
// 5. make a todo with node only 


const fs = require("node:fs");
const path = require("node:path");
const { log } = require("node:util");

const wifi = require('node-wifi');
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});
wifi.scan((error, networks) => {
    if(error){
        console.log(error);
        return
    }
    else{
        console.log(networks);
        
    }
})


// ! Create
const createFile = (path, content) => {
  fs.writeFile(path, content, () => {
    console.log(`${path} File createed successfully`);
  });
};
let createContent =
  "Hello, I am Jyotirmay\nI am working on node.js\nThis is sample2";
let sample2Path = path.join(__dirname + "/" + "sample2.txt");

// console.log(sample2Path);

let fileName = sample2Path.slice(sample2Path.lastIndexOf("\\") + 1);
// console.log(fileName);

// createFile(fileName, createContent)

// ! Read
const readFlie = (path) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log("Error is", error);
      return;
    }
    console.log(data.toString());
  });
};

// readFlie(sample2Path)

// ! Update
const updateFile = (path, updater) => {
  if (fs.existsSync(path)) {
    fs.readFile(sample2Path, (error, data) => {
      if (error) {
        console.log("Error in reading file");
        return;
      }
      const newData = updater(data.toString());
      createFile(path, newData);
    });
  } else {
    console.log("File does not exists! Give a correct path");
  }
};

// updater
const makeAllCap = (content) => {
  return content.toUpperCase();
};

// try{
//     updateFile(sample2Path, makeAllCap)
// }
// catch(e){
//     console.log("error yaha he");

// }

// ! Delete
const deleteFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlink(path, () => {
      console.log("file deleted successfully");
    });
  } else {
    console.log("File or path does not exists please enter a valid one");
  }
};

// deleteFile(__dirname+"/"+"fileToDelete.txt");