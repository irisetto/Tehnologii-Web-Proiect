const pool = require("../utils/db");

exports.getAllAni = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM animals");
    client.release();

    const animalsArray = result.rows.map((row) => row);
    return animalsArray;
  } catch (err) {
    console.error("Error execution querry", err);
  }
};

exports.getAniParameters = async (filters) => {
  try {
    const client = await pool.connect();
    let query = "SELECT * FROM animals";
    let params = [];
    let paramIndex = 1;

    if (filters) {
      const filterKeys = Object.keys(filters);
      if (filterKeys.length > 0) {
        query += " WHERE";

        filterKeys.forEach((key, index) => {
          if (Array.isArray(filters[key])) {
            const paramNames = filters[key]
              .map(() => `$${paramIndex++}`)
              .join(", ");
            params.push(...filters[key]);
            query += ` ${key} = ANY(ARRAY[${paramNames}])`;
          } else {
            params.push(filters[key]);
            query += ` ${key} = $${paramIndex++}`;
          }

          if (index < filterKeys.length - 1) {
            query += " AND";
          }
        });
      }
    }
    const result = await client.query(query, params);
    client.release();

    const animalsArray = result.rows.map((row) => row);
    return animalsArray;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

exports.getAniWithId = async (animalId) => {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM animals WHERE id = $1';
    const values = [animalId];
    const result = await client.query(query, values);
    client.release();

    const animal = result.rows[0];
    return animal;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

// const filters = {
//     class: ["Mammal", "Reptile"]
// };
// const animals = await animale.getAniParameters(filters);
// console.log(animals);

exports.insertAnimal = async (animal) => {
  try {
    const { animalClass, common_name, scientific_name, habitat, lifestyle, diet,
      weight, height, region, lifespan, skin_type, about_text } = animal;

    const client = await pool.connect();
    const query = `INSERT INTO animals ("class",common_name,scientific_name,habitat,lifestyle,diet,weight,height,region,lifespan,skin_type,about_text) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    const values = [
      animalClass,
      common_name,
      scientific_name,
      habitat,
      lifestyle,
      diet,
      weight,
      height,
      region,
      lifespan,
      skin_type,
      about_text
    ];

    await client.query(query, values);
    client.release();

    console.log("New animal inserted successfully.");
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};
// const animal = {
//   animalClass: "Mammal",
//   common_name: "Lion",
//   scientific_name: "Panthera leo",
//   habitat: "Grasslands",
//   lifestyle: "Carnivorous",
//   diet: "Meat",
//   weight: 190,
//   height: 120,
//   region: "Africa",
//   lifespan: 10,
//   skin_type: "Fur",
//   about_text: "The lion is a large cat species."
// };

exports.deleteAnimal = async (animalId) => {
  try {
    const client = await pool.connect();
    const query = 'DELETE FROM animals WHERE id = $1';
    const values = [animalId];
    await client.query(query, values);
    client.release();

    console.log('Animal deleted successfully.');
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};