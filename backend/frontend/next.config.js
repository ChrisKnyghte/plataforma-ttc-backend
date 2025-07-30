module.exports = {
  output: 'standalone', // Para despliegues serverless
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001', // Cambiar en producción
  },
};