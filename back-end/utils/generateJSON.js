const fs = require('fs');
const path = require('path');

exports.generateAnimalJson = (animal) => {
  const jsonContent = JSON.stringify(animal, null, 2);

  return {
    fileName: `${animal.name}.json`,
    fileContent: jsonContent
  };
};

exports.generateAnimalXml = (animal) => {
  let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xmlString += `<${animal.name}>\n`;

  for (const key in animal) {
    if (animal.hasOwnProperty(key)) {
      const value = animal[key];
      xmlString += `  <${key}>${value}</${key}>\n`;
    }
  }

  xmlString += `</${animal.name}>\n`;

  return {
    fileName: `${animal.name}.xml`,
    fileContent: xmlString
  };
};

exports.createAnimalFromJson = async (filePath) => {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    if (
      jsonData.class &&
      jsonData.common_name &&
      jsonData.scientific_name &&
      jsonData.habitat &&
      jsonData.lifestyle &&
      jsonData.diet &&
      jsonData.weight &&
      jsonData.height &&
      jsonData.region &&
      jsonData.lifespan &&
      jsonData.skin_type &&
      jsonData.about_text) {

      const animal = {
        class: jsonData.class,
        common_name: jsonData.common_name,
        scientific_name: jsonData.scientific_name,
        habitat: jsonData.habitat,
        lifestyle: jsonData.lifestyle,
        diet: jsonData.diet,
        weight: jsonData.weight,
        height: jsonData.height,
        region: jsonData.region,
        lifespan: jsonData.lifespan,
        skin_type: jsonData.skin_type,
        about_text: jsonData.about_text,
      };

      return animal;
    } else {
      console.log('Invalid JSON structure');
      return null;
    }
  } catch (error) {
    console.error('Error reading JSON file', error);
    return null;
  }
};