const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Users } = require('./users');
const { SharedProblems } = require('./problems');

const RecievedSolutions = sequelize.define('recievedSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solutionSentUsername: {
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
  RecievedSolutions
};
