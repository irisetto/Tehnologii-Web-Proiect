
const UsersModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  const users = await UsersModel.getAllUsers();
  if (!users) {
    res.end("Eroare la preluarea userilor!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

const getUserById = async (req, res) => {
  const urlParts = req.url.split('/');
  const id = urlParts[3];
  const user = await UsersModel.getUserWithId(id);
  if (!user) {
    res.end("NU exista user cu acest id!");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(user));
  if (req.method === 'DELETE') {
    UsersModel.deleteUser(id)
      .then(() => {
        res.statusCode = 200;
        res.end('User deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting user', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}
const usersController = async (req, res) => {
  if (req.url === "/api/users") {
    getAllUsers(req, res);
  } else if (req.url.startsWith("/api/users/"))
    getUserById(req, res);
  else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = usersController;
