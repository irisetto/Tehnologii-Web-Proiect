const pool = require("../utils/db");


exports.getAllUsers = (async () => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM users");
        client.release();

        const usersArray = result.rows.map(row => row);
        return usersArray;

    } catch (err) {
        console.error("Error execution querry", err);
    }
});


exports.getUserWithEmail = async (email) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "SELECT * FROM users WHERE email = $1",
            values: [email],
        };
        const result = await client.query(query);
        client.release();

        if (result.rows.length > 0) {
            const user = result.rows[0];
            return user;
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error executing query", err);
    }
};


