const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const DbUsers = sequelize.define('dbUsers', {
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

const SharedCode = sequelize.define('sharedCode', {
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
  userId: { // Add this column for the foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const ProblemSolutions = sequelize.define('problemSolutions', {
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
  solverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isTrue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

DbUsers.hasMany(SharedCode, {
  foreignKey: 'userId',
  as: 'problems',
});

SharedCode.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

SharedCode.hasMany(ProblemSolutions, {
  foreignKey: 'problemId',
  as: 'solutions',
});

ProblemSolutions.belongsTo(SharedCode, {
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
  DbUsers,
  SharedCode,
  ProblemSolutions,
};