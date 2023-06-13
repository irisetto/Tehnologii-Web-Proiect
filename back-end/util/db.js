const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "zom",
    password: "pass",
    port: 5432,
    max: 30,
    min: 30
})

module.exports = pool;