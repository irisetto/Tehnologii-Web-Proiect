
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
