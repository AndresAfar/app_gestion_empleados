import React, { useState, useEffect } from 'react';
import { getEmpleados, deleteEmpleado } from '../api/empleadoService';
import EmpleadoForm from './EmpleadoForm';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleEdit = (id) => {
    const employee = empleados.find(emp => emp._id === id);
    setCurrentEmployee(employee);
    setIsEdit(true);
  };

  const handleFormSubmit = () => {
    setIsEdit(false);
    setCurrentEmployee(null);
    loadEmpleados();
  };

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Empleados</h2>
      {isEdit ? (
        <EmpleadoForm
          onSubmit={handleFormSubmit}
          initialData={currentEmployee}
          isEdit={isEdit}
        />
      ) : (
        <>
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
                      <button onClick={() => handleEdit(empleado._id)}>Editar</button>
                      <button onClick={() => handleDelete(empleado._id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default EmpleadoList;
