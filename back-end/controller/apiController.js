const animalsController = require("./animalsController");
const usersController = require("./usersController");
const settingsController = require("./settingsController");
const ticketsController = require("./ticketsController");


const { handleHelp } = require("./helpController");
const { handleLogin } = require("./login");
const { handleRegister } = require("./register");
const { handleSendCode } = require("./forgotPass");
const { handleInsertCode } = require("./forgotPass");
const { handleChangePass } = require("./forgotPass");
const authenticateJWT = require("../utils/authenticateJWT");
const { handleChangePasswordProfile } = require("./profileController.js");
const { handleSaveInfo } = require("./profileController.js");
const { handleUpdateProfilePicture } = require("./profileController.js");
const { handleSubmitTicket } = require("./profileController.js");



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
    } else if (req.url.startsWith("/api/changePasswordProfile")) {
      authenticateJWT(req, res, () => {
        handleChangePasswordProfile(req, res);
      });
    } else if (req.url.startsWith("/api/saveInfo")) {
      authenticateJWT(req, res, () => {
        handleSaveInfo(req, res);
      });
    } else if (req.url.startsWith("/api/updateProfilePicture")) {
      authenticateJWT(req, res, () => {
        handleUpdateProfilePicture(req, res);
      });
    } else if (req.url.startsWith("/api/submitTicket")) {
      authenticateJWT(req, res, () => {
        handleSubmitTicket(req, res);
      });
    }
    else if (req.url.startsWith("/api/help")) {
      authenticateJWT(req, res, () => {
        handleHelp(req, res);
      });
    } else if (req.url === "/api/changePass") {
      handleChangePass(req, res);
    } else if (req.url.startsWith("/api/theme")) {
      authenticateJWT(req, res, () => {
        settingsController(req, res);
      });
    } else if (req.url == "/api/animals/filter") {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
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
    } else if (req.url.startsWith("/api/users")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else if (req.url.startsWith("/api/tickets")) {
      authenticateJWT(req, res, () => {
        ticketsController(req, res);
      });
    }
    else if (req.url.startsWith("/api/logUser")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else if (req.url === "/api/logUserTheme") {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else if (req.url === "/api/animalNames") {
      authenticateJWT(req, res, () => {
        //console.log("heeheheheh");
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/animalJSON\/([0-9]+)/)) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/animalXML\/([0-9]+)/)) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match("/api/getAllImage1")) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/getAnimalImage2\/([0-9]+)/)) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    }
    else if (req.url.match(/\/api\/getAnimalImage1\/([0-9]+)/)) {
      console.log("animal animalImage1");
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/getAniFrench\/([0-9]+)/)) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match("/api/getLanguage")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  } else if (req.method === "DELETE") {
    if (req.url.startsWith("/api/users")) {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    } else if (req.url.startsWith("/api/tickets")) {
      authenticateJWT(req, res, () => {
        ticketsController(req, res);
      });
    } else if (req.url.startsWith("/api/deleteAnimal")) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    }
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  } else if (req.method === "PUT") {
    if (req.url === "/api/insertAni") {
      authenticateJWT(req, res, () => {
        console.log("Insert Ani")
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/setAnimalImage1\/([0-9]+)/)) {
      console.log("animal animalImage1");
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    } else if (req.url.match(/\/api\/setAnimalImage2\/([0-9]+)/)) {
      authenticateJWT(req, res, () => {
        animalsController(req, res);
      });
    }
    else if (req.url === "/api/setLanguage") {
      authenticateJWT(req, res, () => {
        usersController(req, res);
      });
    }
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }

  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
};
