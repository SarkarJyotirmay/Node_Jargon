const http = require("node:http");
const PORT = 8888;
const serverFn = (req, res) => {
  console.log("Recived response");
  if (req.url === "/todo") {
    if (req.method === "GET") {
      res.end(JSON.stringify({ Method: "GET" }));
    } else if (req.method === "POST") {
      res.end(JSON.stringify({ Method: "POST" }));
    }
  }
};
const app = http.createServer(serverFn);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
