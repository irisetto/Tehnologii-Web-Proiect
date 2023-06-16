// const getDynamicAnimalsPage()
const AnimalsModel = require("../models/animalModel");
const AnimalImages = require("../models/animalImageModel");
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

const getAniImage1 = async (req, res) => {
  try {
    const animalId = req.url.split('/')[3];
    const animalImage = await AnimalImages.getAnimalImage1(animalId);
    //console.log(animalImage);
    if (animalImage !== null) {
      const image = Buffer.from(animalImage, 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length
      });
      res.end(image);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found');
    }

  } catch (err) {
    console.error('Error retrieving image', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
}

const setAnimalImage1 = async (req, res) => {
  try {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", async () => {
      const animalId = req.url.split('/')[3];
      const imageData = Buffer.concat(chunks);

      console.log(animalId, imageData);

      if (imageData.length === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Empty request body');
        return;
      }

      const existingImage = await AnimalImages.getAnimalImage1(animalId);
      if (existingImage) {
        res.writeHead(409, { 'Content-Type': 'text/plain' });
        res.end('Animal image already exists');
        return;
      }

      await AnimalImages.insertAnimalImage1(animalId, imageData);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Animal image updated successfully');
    });
  } catch (err) {
    console.error('Error updating animal image', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
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
  } else if (req.url.match(/\/api\/getAnimalImage1\/([0-9]+)/)) {
    //console.log("get animal animalImage1");
    getAniImage1(req, res);
  }
  else if (req.url.match(/\/api\/setAnimalImage1\/([0-9]+)/)) {
    console.log("insert animal animalImage1");
    setAnimalImage1(req, res);
  }
  else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = animalsController;
