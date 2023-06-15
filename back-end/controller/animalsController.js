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

const getAllAnimalNames = async (req, res) => {
  const animals = await AnimalsModel.getAllAni();
  if (!animals) {
    res.end("Ai belit carasu, nu merge sa ia animalele din baza de date");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(animals));
};

const getAnimalById = async (req, res) => {
  const id = req.url.split("/")[3];
  const animal = await AnimalsModel.getAnimalById(id);
  if (!animal) {
    res.end(
      `Ai belit carasu, nu merge sa ia animalul cu id-ul ${id} din baza de date`
    );
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(animal));
};

const getFilteredAnimals = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const filters = JSON.parse(body);

    try {
      const filteredAnimals = await AnimalsModel.getAniParameters(filters);
      res.end(JSON.stringify(filteredAnimals));
    } catch (err) {
      console.error("Error handling login", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  });
};

const animalsController = async (req, res) => {
  if (req.url === "/api/animals") {
    getAllAnimals(req, res);
  } else if (req.url.match(/\/api\/animals\/([0-9]+)/)) {
    getAnimalById(req, res);
  } else if (req.url === "/api/animalNames") {
    getAllAnimalNames(req, res);
  } else if (req.url == "/api/animals/filter") {
    getFilteredAnimals(req, res);
  } else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = animalsController;
