const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('soporte_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;