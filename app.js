const cors = require("cors");
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Puedes utilizar el middleware 'body-parser' para analizar datos JSON
const config = require('./src/config/config'); // Importar la configuración de la base de datos
const API_PREFIX = '/api/v1';

// Importar rutas
const profilesRoutes = require('./src/routes/profilesRoutes'); // Asegúrate de proporcionar la ruta correcta a tus archivos de rutas
const usersRoutes = require('./src/routes/usersRoutes'); // Asegúrate de proporcionar la ruta correcta a tus archivos de rutas

app.use(cors());

// Middleware para analizar datos JSON
app.use(bodyParser.json());

// Rutas
app.use(`${API_PREFIX}/profiles`, profilesRoutes);
app.use(`${API_PREFIX}/users`, usersRoutes);

// Puerto de escucha
const port = config.port || 3000; // Utiliza el puerto proporcionado por la variable de entorno o el puerto 3000 de forma predeterminada

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
