const path = require("path");
const fs = require("fs");
const authenticateJWT = require("../utils/authenticateJWT");

const handleStaticRequest = (req, res) => {
  if (req.url == "/" || req.url == "/index") {
    serveView(req, res, "index.html");
  } else if (req.url.startsWith("/home")) {
    serveView(req, res, "home.html");
  } else if (req.url.startsWith("/login")) {
    serveView(req, res, "login.html");
  } else if (req.url.startsWith("/help")) {
    serveView(req, res, "help.html");
  } else if (req.url.startsWith("/about")) {
    serveView(req, res, "about.html");
  } else if (req.url.startsWith("/settings")) {
    serveView(req, res, "settings.html");
  } else if (req.url.startsWith("/animals")) {
    serveView(req, res, "animals.html");
  } else if (req.url.startsWith("/animal")) {
    const id = req.url.split("?id=")[1].replace(/%20/g, " ");
    console.log(id);
    serveView(req, res, "animal.html");
  } else if (req.url.startsWith("/register")) {
    serveView(req, res, "register.html");
  } else if (req.url.startsWith("/profile")) {
    serveView(req, res, "profile.html");
  } else if (req.url.startsWith("/forgotPassword")) {
    serveView(req, res, "forgot.html");
  } else if (req.url.startsWith("/insertCode")) {
    serveView(req, res, "code.html");
  } else if (req.url.startsWith("/changePassword")) {
    serveView(req, res, "change_pass.html");
  } else if (req.url.startsWith("/users")) {
    serveView(req, res, "users.html");
  } else if (req.url.startsWith("/tickets")) {
    serveView(req, res, "tickets.html");
  }/*
  else if (req.url.startsWith("/test")) {
    serveView(req, res, "test.html");
  }*/
  else {
    const fileUrl = "/public" + req.url;

    const filepath = path.resolve("." + fileUrl);
    const fileExt = path.extname(filepath);
    fs.access(filepath, (err) => {
      if (err) {
        res.statusCode = 404;
        serveView(req, res, "notFound.html");
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

const fileContentType = {
  ".css": "text/css",
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".js": "application/javascript",
};

module.exports = handleStaticRequest;
