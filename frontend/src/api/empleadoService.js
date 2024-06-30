import axios from 'axios';

const API_URL = 'http://localhost:10000/api/empleados';

export const getEmpleados = () => {
  return axios.get(API_URL);
};

export const createEmpleado = (empleado) => {
  return axios.post(API_URL, empleado);
};

export const updateEmpleado = (id, empleado) => {
  return axios.put(`${API_URL}/${id}`, empleado);
};

export const deleteEmpleado = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};