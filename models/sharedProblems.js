const sequelize = require("../utils/db")
const { DataTypes} = require('sequelize')


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


module.exports = SharedProblems