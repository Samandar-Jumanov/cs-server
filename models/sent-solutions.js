const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Users } = require('./users');
const { SharedProblems } = require('./problems');


const SentSolutions = sequelize.define('sentSolutions', {
    id :{
          type :DataTypes.INTEGER,
          primaryKey : true,
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

SentSolutions.belongsTo(Users, { foreignKey: 'userId' });
SentSolutions.belongsTo(SharedProblems, { foreignKey: 'problemId' });


module.exports ={
    SentSolutions
}