import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [sims, setSims] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/sims')
      .then(response => setSims(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Lista de SIMs</h1>
      <ul>
        {sims.map(sim => (
          <li key={sim.id_sim}>
            {sim.id_sim} - {sim.linea} ({sim.estado})
          </li>
        ))}
      </ul>
    </div>
  );
}