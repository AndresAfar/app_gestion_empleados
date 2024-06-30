const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const empleadoRoutes = require('./routes/empleado.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Añadir esta línea para habilitar CORS

app.use('/api/empleados', empleadoRoutes);

module.exports = app;