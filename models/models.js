const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

const ShareProblems = sequelize.define('problems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  problem: {
    type: DataTypes.JSONB,
    allowNull: false,
    unique: true,
  },

  isSolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const SharedSolutions = sequelize.define('sharedSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  solverName :{
    type : DataTypes.STRING ,
    allowNull : false 
  },
  isTrue :{
    type : DataTypes.BOOLEAN,
    allowNull : false ,
  },
});

Users.hasMany(ShareProblems, {
  foreignKey: 'userId',
  as: 'problems',
});

ShareProblems.belongsTo(Users, {
  foreignKey: 'userId',
});

ShareProblems.hasMany(SharedSolutions, {
  foreignKey: 'problemId',
  as: 'solutions',
});

SharedSolutions.belongsTo(ShareProblems, {
  foreignKey: 'problemId',
});

sequelize
  .sync()
  .then(() => {
    console.log('DB is working');
  })
  .catch((error) => {
    console.log(error);
  });
  

module.exports = {
  Users,
  ShareProblems,
  SharedSolutions,
};