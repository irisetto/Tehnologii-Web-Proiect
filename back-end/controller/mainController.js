const fs = require("fs");
const path = require("path");
const url = require("url");
const { handleRegister } = require("./register");
const { handleLogin } = require("./login");
const animalsController = require("./animalsController");
const { handleHelp } = require("./helpController");
const handleStaticRequest = require("./staticController");
const { handleApiRequest } = require("./apiController");

const handleRequest = (req, res) => {
  if (req.url.startsWith("/api")) {
    handleApiRequest(req, res);
  } else {
    handleStaticRequest(req, res);
  }
};

const handlePostRequests = (req, res) => {
  if (req.url.startsWith("/register")) {
    handleRegister(req, res);
  } else if (req.url.startsWith("/login")) {
    handleLogin(req, res);
  } else if (req.url.startsWith("/help")) {
    handleHelp(req, res);
  } else res.end("post?");
};

// const handleApiRequest = (req, res) => {
//   animalsController(req, res);
//   //res.end("salut");
// };

module.exports = handleRequest;
