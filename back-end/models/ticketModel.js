const pool = require("../utils/db");

exports.getAllTickets = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM tickets");
    client.release();

    const animalsArray = result.rows.map((row) => row);
    return animalsArray;
  } catch (err) {
    console.error("Error execution querry", err);
  }
};

exports.insertTicket = async (ticket) => {
    try {
        const {  section, manager,desc, userId} = ticket;
        const client = await pool.connect();
        const querry = {
            text: "INSERT INTO tickets (zoo_section,manager,description,id_user) VALUES ($1,$2,$3,$4)",
            values: [ section, manager,desc,userId ]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};

exports.getTicketById = async (id) => {
    try {
        const client = await pool.connect();
        const query = {
            text: "SELECT * FROM tickets WHERE id = $1",
            values: [id],
        };
        const result = await client.query(query);
        client.release();

        if (result.rows.length > 0) {
            const ticket = result.rows[0];
            return ticket;
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error executing query", err);
    }
};
exports.deleteTicketById = async (id) => {
    try {
        const client = await pool.connect();
        const querry = {
            text: "DELETE FROM tickets WHERE id = $1",
            values: [id]
        };

        await client.query(querry);
        client.release;

    } catch (err) {
        console.error("Error executing query", err);
    }
};