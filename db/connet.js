const mysql = require("mysql");
require("dotenv").config();

//Connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//connect to database
pool.getConnection((err, connection) => {
  if (err) throw err; //Not Connected
  console.log(`Connected as ID ` + connection.threadId);
});

module.exports = pool;
