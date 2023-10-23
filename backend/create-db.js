const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const connection = mysql2.createConnection(dbConfig);

connection.connect(function (err) {
  if (err) throw err;
  connection.query(
    'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "sow"',
    function (err, rows) {
      if (err) throw err;
      if (rows.length === 0) {
        console.log("Database does not exist");
        connection.query("CREATE DATABASE sow", function (err) {
          if (err && err.code !== "ER_DB_CREATE_EXISTS") {
            throw err;
          }
        });
      } else {
        console.log("Database exists");
      }
      connection.end();
    }
  );
});

// connection.connect(function (err) {
//   if (err) throw err;
//   connection.query("CREATE DATABASE sow", function (err) {
//     if (err && err.code !== "ER_DB_CREATE_EXISTS") {
//       throw err;
//     }
//     connection.end();
//   });
// });
