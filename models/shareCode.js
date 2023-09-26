const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const DbUsers = require('./users');

const SharedCode = sequelize.define('sharedCode', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  problem: {
    type: DataTypes.JSONB,
    allowNull: false,
    unique: true,
  },
  isSolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

SharedCode.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

module.exports = SharedCode;