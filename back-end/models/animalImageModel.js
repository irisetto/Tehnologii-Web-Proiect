const pool = require("../utils/db");

exports.getAnimalImage1 = async (animalId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT image1 FROM animal_images WHERE animal_id = $1', [animalId]);
        client.release();

        return result.rows[0]?.image1 || null;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

exports.getAnimalImage2 = async (animalId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT image2 FROM animal_images WHERE animal_id = $1', [animalId]);
        client.release();

        return result.rows[0]?.image2 || null;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

exports.getAnimalImage1 = async (animalId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT image3 FROM animal_images WHERE animal_id = $1', [animalId]);
        client.release();

        return result.rows[0]?.image3 || null;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};
