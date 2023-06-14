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

exports.getUserWithPhonenumber = async (phonenumber) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "SELECT * FROM users WHERE phone_number = $1",
            values: [phonenumber],
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

exports.insertUser = async (user) => {
    try {
        const { first_name, last_name, email, phone_number, password, position } = user;
        const client = await pool.connect();
        const querry = {
            text: "INSERT INTO users (first_name, last_name, email, phone_number, password, occupied_position) VALUES ($1,$2,$3,$4,$5,$6)",
            values: [first_name, last_name, email, phone_number, password, position]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};
exports.changePassword = async (pass,email) => {
    try {
        const client = await pool.connect();
        const querry = {
            text: "UPDATE users SET password = $1 WHERE email = $2",
            values: [pass,email]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};
