const animalsController = require("./animalsController");
const { handleHelp } = require("./helpController");
const { handleLogin } = require("./login");
const { handleRegister } = require("./register");

exports.handleApiRequest = (req, res) => {
  if (req.url.startsWith("/api/animals")) {
    animalsController(req, res);
  } else if (req.url.startsWith("/api/login")) {
    handleLogin(req, res);
  } else if (req.url.startsWith("/api/register")) {
    handleRegister(req, res);
  } else if (req.url.startsWith("/api/help")) {
    handleHelp(req, res);
  }
};
