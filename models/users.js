const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { SharedProblems } = require('./problems');
const { SentSolutions } = require('./sent-solutions');
const {RecievedSolutions} = require('./recieved-solutions')

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



// Associations
Users.hasMany(SharedProblems, { as: 'sharedProblems', foreignKey: 'userId' });
Users.hasMany(SentSolutions , {as :'sentSolutions', foreignKey : 'userId'})
Users.hasMany(RecievedSolutions , { as : 'recievedSolutions', foreignKey :'userId'})



module.exports = {
  Users,
};