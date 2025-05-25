const http = require("node:http");
const dummyUsersData = {
  result: [
    {
      userid: 1,
      name: "Peter",
    },
    {
      userid: 2,
      name: "Tony",
    },
  ],
};

const dummyTodosData = {
  result: [
    {
      todoid: 1,
      title: "Lorem ipsum dor sit amet",
    },
  ],
};

const dumyHomedata = {
  result: [{ location: "Home page", author: "Jyotirmay" }],
};

function serverFn(req, res) {
  console.log(req.url);
  console.log("Req recived");
  if (req.url === "/") {
    res.writeHead(200, { "COntent-Type": "aplication/json" });
    res.end(JSON.stringify(dumyHomedata));
  } else if (req.url === "/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dummyTodosData));
  } else if (req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dummyUsersData));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ error: "page not found" }]));
  }
}

const app = http.createServer(serverFn);

app.listen(8080, () => {
  console.log("Server is running on port", 8080);
});
