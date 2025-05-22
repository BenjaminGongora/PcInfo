const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo PcInfo

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
  // En tu modelo, define un validador
area: {
  type: DataTypes.STRING(50),
  allowNull: false,
  validate: {
    isIn: [['Ventas', 'Marketing', 'IT']] // Valores permitidos
  }
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
},  {
  tableName: 'pc_infos',
  timestamps: false, // Deshabilitar timestamps
  underscored: false,
  freezeTableName: true
});
module.exports = PcInfo;