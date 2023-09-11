const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');


const Solutions = sequelize.define('solutions',{
    id :{
        type :DataTypes.INTEGER,
        primaryKey : true,
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


module.exports = {
   
    Solutions
}