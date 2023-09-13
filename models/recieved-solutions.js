const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const {Users} = require('../models/users')


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
  },
  problemId :{
    type : DataTypes.INTEGER ,
    allowNull : false 
  }
});
RecievedSolutions.belongsTo(Users);
Users.hasMany(RecievedSolutions)



module.exports = {
  RecievedSolutions
};
