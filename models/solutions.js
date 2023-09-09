const sequelize = require("../utils/db");
const { DataTypes } = require('sequelize');
const SharedProblems = require("./sharedProblems");
const Users = require("./users");

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
    problemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

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
    problem: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    solution: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

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
    }
});

// Associations
Solutions.belongsTo(SharedProblems);
SharedProblems.belongsTo(Users);
SentSolutions.belongsTo(Users);
RecievedSolutions.belongsTo(Users);

module.exports = {
    Solutions,
    SentSolutions,
    RecievedSolutions
};