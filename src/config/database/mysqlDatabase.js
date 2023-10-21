const config = require("../config");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

db.connect((error) => {
  if (error) {
    console.error("Error al conectar a MySQL:", error);
    return;
  }
  console.log("Conexión a MySQL establecida");
});

module.exports = db;
