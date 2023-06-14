const animalsController = require("./animalsController");
const usersController = require("./usersController");

const { handleHelp } = require("./helpController");
const { handleLogin } = require("./login");
const { handleRegister } = require("./register");
const { handleSendCode } = require("./forgotPass");
const { handleInsertCode } = require("./forgotPass");
const { handleChangePass } = require("./forgotPass");


exports.handleApiRequest = (req, res) => {
  if (req.url.startsWith("/api/animals")) {
    animalsController(req, res);
  } else  if (req.url.startsWith("/api/users")) {
    usersController(req, res);
  }  
  else if (req.url.startsWith("/api/login")) {
    handleLogin(req, res);
  } else if (req.url.startsWith("/api/register")) {
    handleRegister(req, res);
  } else if (req.url.startsWith("/api/help")) {
    handleHelp(req, res);
  }else if (req.url.startsWith("/api/code")) {
    handleSendCode(req, res);
  }
  else if (req.url.startsWith("/api/insertCode")) {
    handleInsertCode(req, res);
  }
  else if (req.url.startsWith("/api/changePass")) {
    handleChangePass(req, res);
}
};
