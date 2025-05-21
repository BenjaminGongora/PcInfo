const { Sequelize } = require('sequelize');

// Usa la URL externa de Render (con SSL)
const sequelize = new Sequelize(
  'postgresql://developerbenjamin_user:uPC1SN0ANuu4MwpcbeehybG9ROGnxZaD@dpg-d0n0uuje5dus73ata2m0-a.oregon-postgres.render.com/developerbenjamin',
  {
    dialect: 'postgres', // ¡Cambia a 'postgres'!
    protocol: 'postgres', // Especifica el protocolo
    dialectOptions: {
      ssl: { // Conexión segura obligatoria en Render
        require: true,
        rejectUnauthorized: false // Solo para desarrollo (en producción usa un certificado válido)
      }
    },
    logging: false // Opcional: desactiva logs de SQL en consola
  }
);

// Verifica la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;