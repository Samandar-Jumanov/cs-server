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

SharedProblems.hasMany(Solutions, { foreignKey: 'problemId'  ,  as :'solutions'});
Solutions.belongsTo(SharedProblems, { foreignKey: 'problemId' });

module.exports = {
  Solutions
};