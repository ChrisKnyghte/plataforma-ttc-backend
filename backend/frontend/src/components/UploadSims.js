import { useState } from 'react';
import axios from 'axios';

export default function UploadSims() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/sims/upload', formData);
      setMessage(response.data.message);
      setFile(null);
    } catch (error) {
      setMessage('Error: ' + error.response?.data?.error || 'Falló la subida');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".xlsx" 
          onChange={(e) => setFile(e.target.files[0])} 
          required
        />
        <button type="submit">Subir Excel</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}