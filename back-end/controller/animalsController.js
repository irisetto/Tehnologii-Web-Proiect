// const getDynamicAnimalsPage()
const AnimalsModel = require("../models/animalModel");

const getAllAnimals = async (req, res) => {
  const animals = await AnimalsModel.getAllAni();
  if (!animals) {
    res.end("Ai belit carasu, nu merge sa ia animalele din baza de date");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(animals));
};

const animalsController = async (req, res) => {
  if (req.url === "/api/animals") {
    getAllAnimals(req, res);
  } else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = animalsController;
