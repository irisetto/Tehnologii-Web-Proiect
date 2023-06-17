const pool = require("../utils/db");

exports.getAllAnimalImage1 = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT animal_id, image1 FROM animal_images');
        client.release();

        console.log('sadsd' + result.rows);

        return result.rows || [];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

exports.getAnimalImage1 = async (animalId) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT image1 FROM animal_images WHERE animal_id = $1', [animalId]);
        client.release();

        //console.log('sadsd' + result);

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

exports.getAnimalImage3 = async (animalId) => {
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

exports.insertAnimalImage1 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "INSERT INTO animal_images (animal_id, image1) VALUES ($1, $2)",
            values: [animalId, imageData]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.updateAnimalImage1 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE animal_images SET image1 = $1 WHERE animal_id = $2",
            values: [imageData, animalId]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};


exports.insertAnimalImage2 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "INSERT INTO animal_images (animal_id, image2) VALUES ($1, $2)",
            values: [animalId, imageData]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.updateAnimalImage2 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE animal_images SET image2 = $1 WHERE animal_id = $2",
            values: [imageData, animalId]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};


exports.insertAnimalImage3 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "INSERT INTO animal_images (animal_id, image3) VALUES ($1, $2)",
            values: [animalId, imageData]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.updateAnimalImage3 = async (animalId, imageData) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE animal_images SET image3 = $1 WHERE animal_id = $2",
            values: [imageData, animalId]
        };

        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};
