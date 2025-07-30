// TEMPORAL, PARA PRUEBAS
console.log("✅ El archivo app.js se está ejecutando..."); // Agrega esta línea al inicio


// PARA MANEJAR ERRORES EN PRODUCCIÓN
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
}

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { sequelize } = require('./models/Sim'); // Conexión a PostgreSQL

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3002', // URL de tu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Configuración de Multer para subir archivos Excel
const upload = multer({ dest: 'uploads/' });

// Sincronizar modelo con la base de datos
sequelize.sync({ force: false })
  .then(() => console.log('✅ Tabla "Sims" sincronizada'))
  .catch(err => console.error('❌ Error:', err));

// Rutas
const simRoutes = require('./routes/simRoutes');
app.use('/api/sims', simRoutes);

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
});