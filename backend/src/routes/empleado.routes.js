const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');

router.post('/', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);
router.get('/:id', empleadoController.obtenerEmpleado);
router.put('/:id', empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;