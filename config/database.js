const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgresql://developerbenjamin_user:uPC1SN0ANuu4MwpcbeehybG9ROGnxZaD@dpg-d0n0uuje5dus73ata2m0-a.oregon-postgres.render.com/developerbenjamin',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

// Exporta solo la instancia sin verificar la conexión aquí
module.exports = sequelize;