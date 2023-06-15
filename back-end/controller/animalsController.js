// const getDynamicAnimalsPage()
const AnimalsModel = require("../models/animalModel");
const { generateAnimalJson } = require("../utils/generateJSON")

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
  const animals = await AnimalsModel.getAllAniNames();
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

const getFilteredAnimals = async (req, res) => {
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

const getJSONAnimal = async (req, res) => {
  const id = req.url.split("/")[3];
  const animal = await AnimalsModel.getAnimalById(id);

  if (!animal) {
    res.statusCode = 404;
    res.end(`Animal not found`);
    return;
  }

  const generatedJson = generateAnimalJson(animal);
  const { fileName, fileContent } = generatedJson;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.statusCode = 200;
  res.end(JSON.stringify({ fileName, fileContent }));
};

const insertA = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const parsedBody = JSON.parse(body);

      if (!parsedBody) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Request body is empty" }));
        res.end();
        return;
      }

      await AnimalsModel.insertAnimal(parsedBody);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Animal inserted successfully" }));
      res.end();
    });
  } catch (err) {
    console.error("Error inserting animal:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Failed to insert animal" }));
    res.end();
  }
};


const animalsController = async (req, res) => {
  if (req.url === "/api/animals") {
    getAllAnimals(req, res);
  } else if (req.url.match(/\/api\/animals\/([0-9]+)/)) {
    getAnimalById(req, res);
  } else if (req.url === "/api/animalNames") {
    //console.log("Animals")
    getAllAnimalNames(req, res);
  } else if (req.url == "/api/animals/filter") {
    console.log('asdasdasd')
    getFilteredAnimals(req, res);
  } else if (req.url.match(/\/api\/animalJSON\/([0-9]+)/)) {
    console.log("animal json");
    getJSONAnimal(req, res);
  } else if (req.url === "/api/insertAni") {
    console.log("insertAni");
    insertA(req, res);
  }
  else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = animalsController;
