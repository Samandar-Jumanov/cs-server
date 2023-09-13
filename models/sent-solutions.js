const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');


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



module.exports = {
  SentSolutions
};