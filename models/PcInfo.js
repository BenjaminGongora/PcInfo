const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PcInfo = sequelize.define('PcInfo', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  area: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  systemmodel: {  // Nota: todo en minúsculas para coincidir con la BD
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'systemmodel'  // Explícitamente define el nombre de columna
  },
  operatingsystem: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'operatingsystem'
  },
  cpu: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  totalramgb: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'totalramgb'
  },
  gpus: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  storagedevices: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'storagedevices'
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'pc_infos',
  timestamps: true, // created_at y updated_at
  underscored: false, // Deshabilitado porque ya estamos usando los nombres exactos
  freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});
module.exports = PcInfo;