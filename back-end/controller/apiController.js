const animalsController = require("./animalsController");
const usersController = require("./usersController");

const { handleHelp } = require("./helpController");
const { handleLogin } = require("./login");
const { handleRegister } = require("./register");
const { handleSendCode } = require("./forgotPass");
const { handleInsertCode } = require("./forgotPass");
const authenticateJWT = require("../utils/authenticateJWT");
const { handleChangePass } = require("./forgotPass");
const { handleChangePasswordProfile } = require("./profileController.js");
const { logUserPass } = require("./profileController.js");


exports.handleApiRequest = (req, res) => {

  if (req.method === "POST") {
    if (req.url.startsWith("/api/login")) {
      handleLogin(req, res);
    } else if (req.url.startsWith("/api/register")) {
      handleRegister(req, res);
    } else if (req.url.startsWith("/api/insertCode")) {
      handleInsertCode(req, res);
    } else if (req.url.startsWith("/api/code")) {
      handleSendCode(req, res);
    }  else if (req.url.startsWith("/api/changePasswordProfile")) {
      authenticateJWT(req, res, () => {
      handleChangePasswordProfile(req, res);
    });

    }else if (req.url.startsWith("/api/help")) {
      authenticateJWT(req, res, () => {
        handleHelp(req, res);
      });
    } 

    else if (req.url === "/api/changePass" ) {
      handleChangePass(req, res);
    }
   
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  } else if (req.method === "GET") {
    if (req.url.startsWith("/api/animals")) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.startsWith("/api/help")) {
      authenticateJWT(req, res, () => {
        handleHelp(req, res);
      });
    }
    else if (req.url.startsWith("/api/users")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else if (req.url.startsWith("/api/logUser")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    }  
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  } else if (req.method === "DELETE") {
    if (req.url.startsWith("/api/users")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }

  } else if (req.method === "PUT") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");

  }

};
