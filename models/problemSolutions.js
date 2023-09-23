const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const SharedCode = require('./shareCode');
const DbUsers = require('./users');

const ProblemSolutions = sequelize.define('problemSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  solverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isTrue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  problem: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});


module.exports = ProblemSolutions;