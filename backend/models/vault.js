const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Vault = sequelize.define('Vault', {
  capsule_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  vault_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  opening_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'locked',
  },
});

module.exports = Vault;
