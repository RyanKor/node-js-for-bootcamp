const mysql = require("mysql2"); //databases

const pool = mysql.createPool({
  // create connection
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "1234",
});

module.exports = pool.promise();
