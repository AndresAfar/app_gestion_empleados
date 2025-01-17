const Empleado = require('../models/empleado.model');

exports.crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleadoActualizado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json(empleadoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};