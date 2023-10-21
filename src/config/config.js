// En un archivo config.js
module.exports = {
  port: 3000,
  jwt: {
    secret: "mi_clave_secreta",
  },
  // Configuración de la base de datos MongoDB
  mongodb: {
    host: "127.0.0.1",
    port: 27017,
    dbName: "users",
  },
  // Configuración de la base de datos MySQL
  mysql: {
    host: "127.0.0.1",
    user: "root",
    password: "Guatemala2023",
    database: "profile_management_system",
  },
};
