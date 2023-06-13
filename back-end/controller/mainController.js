const fs = require("fs");
const path = require("path");
const url = require("url");
const { handleRegister } = require("./register");
const { handleLogin } = require("./login");
const animalsController = require("./animalsController");
const { handleHelp } = require("./helpController");

const handleRequest = (req, res) => {
  if (req.method == "GET") {
    handleGetRequests(req, res);
  } else if (req.method == "POST") {
    handlePostRequests(req, res);
  }
};

const handleGetRequests = (req, res) => {
  console.log(req.url);
  if (req.url.startsWith("/api")) {
    console.log("API");
    handleApiRequest(req, res);
  } else if (req.url == "/" || req.url == "/index") {
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
    serveView(req, res, "animal.html");
  } else if (req.url.startsWith("/register")) {
    serveView(req, res, "register.html");
  } else if (req.url.startsWith("/profile")) {
    serveView(req, res, "profile.html");
  } else if (req.url.startsWith("/forgotPassword")) {
    serveView(req, res, "forgot.html");
  } else if (req.url.startsWith("/insertCode")) {
    serveView(req, res, "code.html");
  } else {
    const fileUrl = "/public" + req.url;
    // let filepath = url.parse(path.__dirname + "/public" + req.url);
    // let fileExt = filepath.pathname.split(".").pop();
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

const handlePostRequests = (req, res) => {
  if (req.url.startsWith("/register")) {
    handleRegister(req, res);
  }

  if (req.url.startsWith("/login")) {
    handleLogin(req, res);
  }
  if (req.url.startsWith("/help")) {
    handleHelp(req, res);
  } else res.end("post request done");
};

const handleApiRequest = (req, res) => {
  animalsController(req, res);
  //res.end("salut");
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
