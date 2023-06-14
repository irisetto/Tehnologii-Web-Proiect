const fs = require("fs");
const path = require("path");
const url = require("url");
const handleStaticRequest = require("./staticController");
const { handleApiRequest } = require("./apiController");

const handleRequest = (req, res) => {
  if (req.url.startsWith("/api")) {
    handleApiRequest(req, res);
  } else {
    handleStaticRequest(req, res);
  }
};

module.exports = handleRequest;
