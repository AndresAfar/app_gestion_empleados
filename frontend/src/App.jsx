import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmpleadoList from './components/EmpleadoList';
import EmpleadoForm from './components/EmpleadoForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Lista de Empleados</Link></li>
            <li><Link to="/add">Añadir Empleado</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<EmpleadoList />} />
          <Route path="/add" element={<EmpleadoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;