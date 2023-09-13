const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const {Users} = require('../models/users')

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
  },
  problemId :{
    type : DataTypes.INTEGER ,
    allowNull : false 
  }
});

// SentSolutions.belongsTo(Users);
// Users.hasMany(SentSolutions)

module.exports = {
  SentSolutions
};