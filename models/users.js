const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const {SharedProblems} = require('./problems')

const Users = sequelize.define('Users', {
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


Users.hasMany(SharedProblems, { foreignKey: 'userId' ,  as :'sharedProblems' });
SharedProblems.belongsTo(Users, { foreignKey: 'userId' });



module.exports = {
  Users,
};