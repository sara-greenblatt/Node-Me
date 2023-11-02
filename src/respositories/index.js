const mysql2 = require('mysql2');
require('dotenv').config();

const {
    HOST, DB_USER, DB_PASSWORD, DB_NAME
} = process.env;

module.exports = mysql2.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // ssl: {ca: <<path>>}
});