const pool = require("../utils/db");
const fs = require('fs');


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

exports.getUserWithId = async (id) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [id],
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
        const { first_name, last_name, email, phone_number, password, position, profile_picture } = user;
        const client = await pool.connect();
        const querry = {
            text: "INSERT INTO users (first_name, last_name, email, phone_number, password, occupied_position,profile_picture) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            values: [first_name, last_name, email, phone_number, password, position, profile_picture]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};



exports.deleteUserById = async (userId) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "DELETE FROM users WHERE id = $1",
            values: [userId],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
}

exports.getPrefferedMode = async (email) => {
    try {
        const client = await pool.connect();
        const querry = {
            text: "SELECT mode_preference FROM users WHERE email = $1",
            values: [email]
        };
        const result = await client.query(querry);
        client.release();

        if (result.rows.length > 0) {
            const user = result.rows[0];
            return user;
        } else {
            return null;
        }

    } catch (err) {
        console.error("Error execution querry", err);
    }
}

exports.setPreferredMode = async (email, mode) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET mode_preference = $1 WHERE email = $2",
            values: [mode, email]
        };
        await client.query(query);
        client.release();

        return true;

    } catch (err) {
        console.error("Error executing query", err);
        return false; 
    }
}

exports.changePassword = async (pass, email) => {
    try {
        const client = await pool.connect();
        const querry = {
            text: "UPDATE users SET password = $1 WHERE email = $2",
            values: [pass, email]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.deleteUser = async (id) => {
    try {
        const client = await pool.connect();
        const querry = {
            text: "DELETE FROM users WHERE id = $1",
            values: [id]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.changeFirstName = async (id, firstName) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET first_name = $1 WHERE id = $2",
            values: [firstName, id],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.changeLastName = async (id, lastName) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET last_name = $1 WHERE id = $2",
            values: [lastName, id],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.changePhoneNumber = async (id, phoneNumber) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET phone_number = $1 WHERE id = $2",
            values: [phoneNumber, id],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.changeEmail = async (id, email) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET email = $1 WHERE id = $2",
            values: [email, id],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.changeOccupiedPosition = async (id, occupiedPosition) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "UPDATE users SET occupied_position = $1 WHERE id = $2",
            values: [occupiedPosition, id],
        };
        await client.query(query);
        client.release();
    } catch (err) {
        console.error("Error executing query", err);
    }
};
exports.changeProfilePicture = async (imageData,userId) => {
    try {
       
        const client = await pool.connect();
        const querry = {
            text: "UPDATE users SET profile_picture=$1 WHERE id=$2",
            values: [imageData,userId]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};

// exports.changeProfilePicture = async (id, imagePath) => {
//     try {
//         const imageData = fs.readFileSync(imagePath);

//         const base64Image = imageData.toString('base64');

//         const client = await pool.connect();
//         const query = {
//             text: 'UPDATE users SET profile_picture = $1 WHERE id = $2',
//             values: [base64Image, id],
//         };

//         await client.query(query);
//         client.release();
//     } catch (err) {
//         console.error('Error executing query', err);
//     }
// };
