const usersModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await usersModel.getAllUsers();
  if (!users) {
    res.end("Eroare la preluarea userilor!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

const getUserById = async (req, res) => {
  const urlParts = req.url.split("/");
  const id = urlParts[3];
  const user = await usersModel.getUserWithId(id);
  if (!user) {
    res.end("NU exista user cu acest id!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(user));
  if (req.method === "DELETE") {
    usersModel
      .deleteUser(id)
      .then(() => {
        res.statusCode = 200;
        res.end("User deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting user", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    if (!decoded) {
      res.statusCode = 401;
      res.end("Invalid or expired JWT");
      return;
    }

    const email = decoded.email;
    const user = await usersModel.getUserWithEmail(email);

    if (!user) {
      res.statusCode = 404;
      res.end("User not found");
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } catch (err) {
    console.error("Error decoding JWT or retrieving user", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

const getLoggedInTheme = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    if (!decoded) {
      res.statusCode = 401;
      res.end("Invalid or expired JWT");
      return;
    }

    const email = decoded.email;
    const theme = await usersModel.getPrefferedMode(email);

    if (!theme) {
      res.statusCode = 404;
      res.end("User not found");
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(theme));
  } catch (err) {
    console.error("Error decoding JWT or retrieving user", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};


const setLanguageSetting = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    if (!decoded) {
      res.statusCode = 401;
      res.end("Invalid or expired JWT");
      return;
    }

    const email = decoded.email;
    const user = await usersModel.getUserWithEmail(email);

    if (!user) {
      res.statusCode = 404;
      res.end("User not found");
      return;
    }

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      const { languageSetting } = JSON.parse(body);

      await usersModel.updateUserLanguageSetting(user.id, languageSetting);

      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    });
  } catch (err) {
    console.error("Error setting the language", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

const getLanguageSetting = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    if (!decoded) {
      res.statusCode = 401;
      res.end("Invalid or expired JWT");
      return;
    }

    const email = decoded.email;
    const user = await usersModel.getUserWithEmail(email);

    if (!user) {
      res.statusCode = 404;
      res.end("User not found");
      return;
    }

    const languageSetting = await usersModel.getUserLanguageSetting(user.email);
    const { language_setting } = languageSetting; 


    res.statusCode = 200;
    res.end(JSON.stringify({ language_setting }));
  } catch (err) {
    console.error("Error getting the language setting", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};


const usersController = async (req, res) => {
  if (req.url === "/api/users") {
    getAllUsers(req, res);
  } else if (req.url.startsWith("/api/users/"))
    getUserById(req, res);
  else if (req.url === "/api/logUser") {
    getLoggedInUser(req, res);
  } else if (req.url === "/api/logUserTheme") {
    getLoggedInTheme(req, res);
  } else if (req.url === "/api/setLanguage") {
    setLanguageSetting(req, res);
  } else if (req.url === "/api/getLanguage") {
    console.log('getLAng');
    getLanguageSetting(req, res);
  }
  else {
    res.end("nu exista api pentru acest request");
  }
};


module.exports = usersController;
