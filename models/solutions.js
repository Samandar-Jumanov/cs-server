const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Users } = require('./users');
const { SharedProblems } = require('./problems');


const SentSolutions = sequelize.define('sentSolutions', {
    id :{
          type :DataTypes.INTEGER,
          primaryKey : true,
          autoIncrement : true 
    },
    solutionRecieverUsername :{
                type : DataTypes.STRING ,
                allowNull : false 
    },
    solution :{
        type : DataTypes.STRING ,
        allowNull : false 

    },
    problem :{
        type : DataTypes.STRING ,
        allowNull : false 

    }

})


const RecievedSolutions = sequelize.define('recievedSolutions', {
    id :{
          type :DataTypes.INTEGER,
          primaryKey : true,
          autoIncrement : true 
    },
    solutionSentUsername :{
                type : DataTypes.STRING ,
                allowNull : false 
    },
    solution :{
        type : DataTypes.STRING ,
        allowNull : false 

    },
    problem :{
        type : DataTypes.STRING ,
        allowNull : false 

    }

})


const Solutions = sequelize.define('solutions',{
    id :{
        type :DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true 
  },
    solution :{
        type : DataTypes.STRING ,
        allowNull : false 

    },
    solverName : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    isTrue : {
        type : DataTypes.BOOLEAN,
        allowNull : false 
    },
    problem :{
        type : DataTypes.STRING ,
        allowNull : false 

    }
})


SentSolutions.belongsTo(Users, { foreignKey :'userId'})
RecievedSolutions.belongsTo(Users, { foreignKey :'userId'})
Solutions.belongsTo(SharedProblems ,{ foreignKey :'problemId'})

module.exports = {
    SentSolutions,
    RecievedSolutions ,
    Solutions
}