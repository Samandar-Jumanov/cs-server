const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../utils/db')


class Users extends Model {}
Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

class SharedProblems extends Model {}
SharedProblems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    problem: DataTypes.STRING,
    problemCreatorId: DataTypes.INTEGER,
    isSolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, modelName: 'sharedProblem' });

class Solutions extends Model {}
Solutions.init({
    solution: DataTypes.STRING,
    problemSolverId: DataTypes.INTEGER,
    problemCreatorId: DataTypes.INTEGER,
    problem: DataTypes.STRING,
    isTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, modelName: 'solution' });

class SentSolutions extends Model {}
SentSolutions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    solutionRecieverUserId: DataTypes.INTEGER,
    solutionId: DataTypes.INTEGER,
    problemId: DataTypes.INTEGER,
    isTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, modelName: 'sentSolution' });

class RecievedSolutions extends Model {}
RecievedSolutions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sentSolutionUserId: DataTypes.INTEGER,
    solutionId: DataTypes.INTEGER,
    problemId: DataTypes.INTEGER,
    isTrue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, modelName: 'recievedSolution' });

// Associations
Users.hasMany(SharedProblems, {foreignKey: 'problemCreatorId'});
SharedProblems.belongsTo(Users, {foreignKey: 'problemCreatorId'});

SharedProblems.hasMany(Solutions, {foreignKey: 'problemId'});
Solutions.belongsTo(SharedProblems, {foreignKey: 'problemId'});

Users.hasMany(SentSolutions, {foreignKey: 'solutionRecieverUserId'});
SentSolutions.belongsTo(Users, {foreignKey: 'solutionRecieverUserId'});

// Sync all models
sequelize.sync();

module.exports ={Users , Solutions, SentSolutions, RecievedSolutions, SharedProblems}
