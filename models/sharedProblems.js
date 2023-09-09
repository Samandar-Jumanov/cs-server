const sequelize = require("../utils/db")
const { DataTypes} = require('sequelize')
const { Solutions } = require("./solutions")

const SharedProblems = sequelize.define('sharedProblems', {
    id : {
         type : DataTypes.INTEGER ,
         autoIncrement : true ,
         primaryKey : true 

    },
    problem : {
         type : DataTypes.STRING ,
         allowNull : false 
    },
    problemCreator : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    isSolved : {
         type :DataTypes.BOOLEAN,
         allowNull : false 
    },
    code :{
     type : DataTypes.STRING , 
     allowNull : false 
    }
})

//Problems and Solutions 

SharedProblems.hasMany(Solutions, {
     as :'solutionsToProblem'
})


module.exports = SharedProblems