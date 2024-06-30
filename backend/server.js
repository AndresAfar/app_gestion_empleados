const app = require('./src/app');
const conectarDB = require('./src/config/database');

const PORT = process.env.PORT || 10000;

conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});