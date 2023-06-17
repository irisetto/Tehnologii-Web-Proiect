// const getDynamicAnimalsPage()
const AnimalsModel = require("../models/animalModel");
const AnimalImages = require("../models/animalImageModel");
const { generateAnimalJson } = require("../utils/generateJSON")
const { generateAnimalXml } = require("../utils/generateJSON");

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

const getAnimalCategories = async (req, res) => {
  const diet = await AnimalsModel.getDistinctDiets();
  const habitat = await AnimalsModel.getDistinctHabitats();
  const lifestyle = await AnimalsModel.getDistinctLifestyles();
  const region = await AnimalsModel.getDistinctRegions();
  const skin_type = await AnimalsModel.getDistinctSkinTypes();

  const data = { diet, habitat, lifestyle, region, skin_type };

  if (!diet || !habitat || !lifestyle || !region || !skin_type) {
    res.end("Ai belit carasu, nu merge sa ia categoriile din baza de date");
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(data));
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

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.statusCode = 200;
  res.end(JSON.stringify({ fileName, fileContent }));
};

const getXMLAnimal = async (req, res) => {
  const id = req.url.split("/")[3];
  const animal = await AnimalsModel.getAnimalById(id);

  if (!animal) {
    res.statusCode = 404;
    res.end(`Animal not found`);
    return;
  }

  const generatedXML = generateAnimalXml(animal);
  const { fileName, fileContent } = generatedXML;

  console.log(fileName, fileContent);

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.statusCode = 200;
  res.end(fileContent);
}

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

const getAllAniImage1 = async (req, res) => {
  try {
    const animalImages = await AnimalImages.getAllAnimalImage1();

    if (animalImages.length > 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(animalImages));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("No images found");
    }
  } catch (err) {
    console.error("Error retrieving images:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const getAniImage1 = async (req, res) => {
  try {
    const animalId = req.url.split('/')[3];
    const animalImage = await AnimalImages.getAnimalImage1(animalId);
    // console.log(animalImage);
    if (animalImage !== null) {
      const imageBuffer = Buffer.from(animalImage, 'base64');
      const imageData = Array.from(imageBuffer);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ data: imageData }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found');
    }

  } catch (err) {
    console.error('Error retrieving image', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const setAnimalImage1 = async (req, res) => {
  try {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", async () => {
      //console.log(chunks);
      const animalId = req.url.split('/')[3];
      const imageData = Buffer.concat(chunks);

      //console.log(animalId, imageData);
      //const uint8Array = new Uint8Array(imageData);
      //console.log(uint8Array)

      if (imageData.length === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Empty request body');
        return;
      }

      const existingImage = await AnimalImages.getAnimalImage1(animalId);
      if (existingImage) {
        await AnimalImages.updateAnimalImage1(animalId, imageData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Animal image already updated');
        return;
      }

      // const base64Image = imageData.toString('base64');
      // console.log('Base64 Image:', base64Image);

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

const getAniImage2 = async (req, res) => {
  try {
    const animalId = req.url.split('/')[3];
    const animalImage = await AnimalImages.getAnimalImage2(animalId);
    // console.log(animalImage);
    if (animalImage !== null) {
      const imageBuffer = Buffer.from(animalImage, 'base64');
      const imageData = Array.from(imageBuffer);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ data: imageData }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found');
    }

  } catch (err) {
    console.error('Error retrieving image', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const setAnimalImage2 = async (req, res) => {
  try {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", async () => {
      //console.log(chunks);
      const animalId = req.url.split('/')[3];
      const imageData = Buffer.concat(chunks);

      //console.log(animalId, imageData);
      //const uint8Array = new Uint8Array(imageData);
      //console.log(uint8Array)

      if (imageData.length === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Empty request body');
        return;
      }

      const existingImage = await AnimalImages.getAnimalImage2(animalId);
      if (existingImage) {
        await AnimalImages.updateAnimalImage2(animalId, imageData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Animal image already updated');
        return;
      }

      // const base64Image = imageData.toString('base64');
      // console.log('Base64 Image:', base64Image);

      await AnimalImages.insertAnimalImage2(animalId, imageData);

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
    getFilteredAnimals(req, res);
  } else if (req.url == "/api/animals/categories") {
    getAnimalCategories(req, res);
  } else if (req.url.match(/\/api\/animalJSON\/([0-9]+)/)) {
    //console.log("animal json");
    getJSONAnimal(req, res);
  } else if (req.url.match(/\/api\/animalXML\/([0-9]+)/)) {
    //console.log("animal xml");
    getXMLAnimal(req, res);
  } else if (req.url.match("/api/getAllImage1")) {
    //console.log("animal img");
    getAllAniImage1(req, res);
  } else if (req.url === "/api/insertAni") {
    //console.log("insertAni");
    insertA(req, res);
  } else if (req.url.match(/\/api\/getAnimalImage1\/([0-9]+)/)) {
    //console.log("get animal animalImage1");
    getAniImage1(req, res);
  }
  else if (req.url.match(/\/api\/setAnimalImage1\/([0-9]+)/)) {
    //console.log("insert animal animalImage1");
    setAnimalImage1(req, res);
  } else if (req.url.match(/\/api\/getAnimalImage2\/([0-9]+)/)) {
    //console.log("get animal animalImage1");
    getAniImage2(req, res);
  }
  else if (req.url.match(/\/api\/setAnimalImage2\/([0-9]+)/)) {
    //console.log("insert animal animalImage1");
    setAnimalImage2(req, res);
  } else {
    res.end("nu exista api pentru acest request");
  }
};

module.exports = animalsController;
