const http = require("http");
const fs = require("fs");
const path = require("path");
const handleRequest = require("./controller/mainController");
const { getAllAni } = require("./models/animalModel");

const server = http.createServer(async (req, res) => {
  //   const url = req.url.split("?")[0];
  handleRequest(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
