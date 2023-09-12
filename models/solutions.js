const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { SharedProblems } = require('./problems');

const Solutions = sequelize.define('solutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  solverName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isTrue: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  solverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


module.exports = {
  Solutions
};