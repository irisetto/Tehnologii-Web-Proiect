const pool = require("../utils/db");


exports.getAllAni = (async () => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM animals");
        client.release();

        const animalsArray = result.rows.map(row => row);
        return animalsArray;

    } catch (err) {
        console.error("Error execution querry", err);
    }
});


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
                        const paramNames = filters[key].map(() => `$${paramIndex++}`).join(", ");
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

// const filters = {
//     class: ["Mammal", "Reptile"]
// };
// const animals = await animale.getAniParameters(filters);
// console.log(animals);