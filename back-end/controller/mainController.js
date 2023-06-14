const fs = require("fs");
const path = require("path");
const url = require("url");
const { handleRegister } = require("./register");
const { handleLogin } = require("./login");
const animalsController = require("./animalsController");
const { handleHelp } = require("./helpController");
const { handleSendCode } = require("./forgotPass");
const { handleInsertCode } = require("./forgotPass");
const { handleChangePass } = require("./forgotPass");

const handleStaticRequest = require("./staticController");
const { handleApiRequest } = require("./apiController");
const handleVerifyRequest = require("./verifyController");

const handleRequest = (req, res) => {
  if (req.url.startsWith("/api")) {
    handleApiRequest(req, res);
  } else if (req.url.startsWith("/verify")) {
    handleVerifyRequest(req, res);
  } else {
    handleStaticRequest(req, res);
  }
};

module.exports = handleRequest;
