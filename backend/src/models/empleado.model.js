const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  puesto: { type: String, required: true },
  salario: { type: Number, required: true },
  fechaContratacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);