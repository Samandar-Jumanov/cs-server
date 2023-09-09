const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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

const SharedProblems = sequelize.define('sharedProblems', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  problemCreator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Solutions = sequelize.define('solutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isTrue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  problemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const RecievedSolutions = sequelize.define('recievedSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solutionSentUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  problem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const SentSolutions = sequelize.define('sentSolutions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solutionRecieverUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  problem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations


Users.hasMany(SharedProblems, {
  as: 'sharedProblems',
  foreignKey :'userId'
});

Users.hasMany(SentSolutions, {
  as: 'sentSolutions',
});

Users.hasMany(RecievedSolutions, {
  as: 'recievedSolutions',
});

SharedProblems.hasMany(Solutions, {
  as: 'solutionsToProblem',
});

Solutions.belongsTo(SharedProblems);
SharedProblems.belongsTo(Users, {
    foreignKey :'username'
});
SentSolutions.belongsTo(Users);
RecievedSolutions.belongsTo(Users);

module.exports = {
  Users,
  SharedProblems,
  Solutions,
  SentSolutions,
  RecievedSolutions,
};