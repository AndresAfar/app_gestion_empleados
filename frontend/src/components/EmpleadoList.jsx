import React, { useState, useEffect } from 'react';
import { getEmpleados, deleteEmpleado } from '../api/empleadoService';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      const response = await getEmpleados();
      setEmpleados(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los empleados. Por favor, intenta de nuevo.');
      console.error('Error al cargar empleados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      try {
        await deleteEmpleado(id);
        setEmpleados(empleados.filter(empleado => empleado._id !== id));
      } catch (err) {
        setError('Error al eliminar el empleado. Por favor, intenta de nuevo.');
        console.error('Error al eliminar empleado:', err);
      }
    }
  };

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Empleados</h2>
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Puesto</th>
              <th>Salario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado._id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.email}</td>
                <td>{empleado.puesto}</td>
                <td>${empleado.salario}</td>
                <td>
                  <button onClick={() => handleDelete(empleado._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpleadoList;