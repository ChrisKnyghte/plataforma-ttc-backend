const { Sim } = require('../models/Sim'); // Importa el modelo correctamente
const xlsx = require('xlsx');
const fs = require('fs');

exports.uploadSims = async (req, res) => {
  // Validar archivo
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo Excel' });
  }

  try {
    // Leer archivo Excel
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Validar datos
    if (!data.length) {
      fs.unlinkSync(req.file.path); // Eliminar archivo temporal
      return res.status(400).json({ error: 'El archivo no contiene datos' });
    }

    // Procesar y validar cada fila
    const sims = data.map(row => {
      if (!row.id_sim || !row.linea) {
        throw new Error('El archivo debe tener columnas "id_sim" y "linea"');
      }
      return {
        id_sim: row.id_sim.toString().padStart(19, '0'),
        linea: row.linea.toString().padStart(15, '0'),
        estado: 'sin_asignar'
      };
    });

    // Guardar en PostgreSQL
    await Sim.bulkCreate(sims, { ignoreDuplicates: true });
    fs.unlinkSync(req.file.path); // Limpiar archivo temporal

    res.status(201).json({ 
      message: `${sims.length} SIMs registrados correctamente` 
    });

  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Limpiar en caso de error
    res.status(500).json({ 
      error: 'Error al procesar el archivo',
      details: error.message 
    });
  }
};

exports.obtenerSims = async (req, res) => {
  try {
    const sims = await Sim.findAll({
      order: [['createdAt', 'DESC']] // Ordenar por fecha descendente
    });
    res.json(sims);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener SIMs',
      details: error.message 
    });
  }
};