import { useState } from 'react';
import UploadSims from './components/UploadSims';
import ListaSims from './components/ListaSims';

function App() {
  const [showList, setShowList] = useState(true);

  return (
    <div>
      <h1>Plataforma TTC</h1>
      <button onClick={() => setShowList(!showList)}>
        {showList ? 'Mostrar Cargador' : 'Mostrar Lista'}
      </button>
      
      {showList ? <ListaSims /> : <UploadSims />}
    </div>
  );
}