import React, { useState } from 'react';
import { createEmpleado } from '../api/empleadoService';
import { useNavigate } from 'react-router-dom';

const EmpleadoForm = () => {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellido: '',
    email: '',
    puesto: '',
    salario: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado(prevEmpleado => ({
      ...prevEmpleado,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmpleado(empleado);
      alert('Empleado añadido con éxito');
      navigate('/'); // Redirige a la lista de empleados después de añadir
    } catch (err) {
      setError('Error al añadir el empleado. Por favor, intenta de nuevo.');
      console.error('Error al crear empleado:', err);
    }
  };

  return (
    <div>
      <h2>Añadir Nuevo Empleado</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={empleado.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={empleado.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="puesto">Puesto:</label>
          <input
            type="text"
            id="puesto"
            name="puesto"
            value={empleado.puesto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="salario">Salario:</label>
          <input
            type="number"
            id="salario"
            name="salario"
            value={empleado.salario}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Añadir Empleado</button>
      </form>
    </div>
  );
};

export default EmpleadoForm;