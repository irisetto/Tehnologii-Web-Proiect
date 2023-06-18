const pool = require("../utils/db");

exports.getFrenchText = async (animalId) => {
    try {
        const client = await pool.connect();
        const query = "SELECT * FROM frenchTexts where animal_id = $1";
        const values = [animalId];
        const result = await client.query(query, values);

        client.release();

        const text = result.rows[0];
        return text;
    } catch (err) {
        console.error("Error execution querry", err);
    }
};