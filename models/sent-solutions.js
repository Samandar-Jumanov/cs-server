const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const {Users} = require('./users')


const SentSolutions = sequelize.define('sentSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solutionRecieverUsername: {
    type: DataTypes.STRING,
    allowNull: false
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



module.exports = {
  SentSolutions
};