const fs = require("fs");
const path = require("path");
const url = require("url");

const handleRequest = (req, res) => {
  if (req.url.startsWith("/animals")) {
    serveView(req, res, "animals.html");
  } else if (req.url.startsWith("/profile")) {
    serveView(req, res, "profile.html");
  } else {
    console.log("PROBA1");
    const fileUrl = "/public" + req.url;
    // let filepath = url.parse(path.__dirname + "/public" + req.url);
    // let fileExt = filepath.pathname.split(".").pop();
    const filepath = path.resolve("." + fileUrl);
    const fileExt = path.extname(filepath);
    fs.access(filepath, (err) => {
      if (err) {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        fs.readFile(filepath, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", fileContentType[fileExt]);
            res.end(data);
          }
        });
      }
    });
  }
};

const fileContentType = {
  ".css": "text/css",
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".js": "application/javascript",
};

const serveView = (req, res, filePath) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  fs.readFile(`./views/${filePath}`, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    } else {
      res.end(data);
    }
  });
};

module.exports = handleRequest;
