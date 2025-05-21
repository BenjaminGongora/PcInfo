const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PcInfo = sequelize.define('PcInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  systemModel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  operatingSystem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpu: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalRAMGB: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  gpus: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  storageDevices: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false
  },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
  tableName: 'pc_infos',
  timestamps: false
});

module.exports = PcInfo;