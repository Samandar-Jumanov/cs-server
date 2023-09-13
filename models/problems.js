const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const {Users} = require('../models/users')

const SharedProblems = sequelize.define('sharedProblems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  problemCreator: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isSolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


SharedProblems.belongsTo(Users)
Users.hasMany(SharedProblems , { foreignKey:'userId' , as:'sharedProblems'});

module.exports = {SharedProblems }
