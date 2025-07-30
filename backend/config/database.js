const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para variables de entorno

const sequelize = new Sequelize(
  process.env.DB_NAME || 'plataforma_ttc', // Nombre BD
  process.env.DB_USER || 'postgres',       // Usuario
  process.env.DB_PASS || 'tu_contraseña',  // Contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Desactiva logs en producción
    pool: {
      max: 5,     // Máximo de conexiones
      min: 0,
      idle: 10000 // Tiempo máximo inactivo
    }
  }
);

// Test de conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('❌ Error de conexión a la BD:', error);
  }
})();

module.exports = sequelize;