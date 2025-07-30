const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate que esta ruta es correcta

const Sim = sequelize.define('Sim', {
  id_sim: {
    type: DataTypes.STRING(19),
    primaryKey: true,
    allowNull: false,
    validate: {
      len: [19, 19] // Validación de 19 dígitos
    }
  },
  linea: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      len: [15, 15] // Validación de 15 dígitos
    }
  },
  estado: {
    type: DataTypes.ENUM('sin_asignar', 'activo', 'inactivo'),
    defaultValue: 'sin_asignar'
  }
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
  tableName: 'Sims' // Nombre exacto de la tabla en PostgreSQL
});

module.exports = Sim; // Exportación ES5 (compatible con CommonJS)