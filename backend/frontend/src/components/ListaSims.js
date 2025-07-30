import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaSims() {
  const [sims, setSims] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const url = filtro 
      ? `http://localhost:3001/api/sims?estado=${filtro}`
      : 'http://localhost:3001/api/sims';
      
    axios.get(url)
      .then(res => setSims(res.data))
      .catch(err => console.error(err));
  }, [filtro]);

  return (
    <div>
      <h2>Lista de SIMs</h2>
      <select onChange={(e) => setFiltro(e.target.value)}>
        <option value="">Todos</option>
        <option value="sin_asignar">Sin asignar</option>
        <option value="asignado">Asignados</option>
      </select>
      
      <ul>
        {sims.map(sim => (
          <li key={sim.id_sim}>
            {sim.id_sim} - {sim.estado} 
            <small>({new Date(sim.createdAt).toLocaleDateString()})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaSims;