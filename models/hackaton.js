const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')


const Hackatons = sequelize.define('hackaton', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    hackatonName : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false 
    },
    hackatonProblem : {
        type : DataTypes.STRING,
        allowNull : false 
    },
    hackatonResult : {
        type : DataTypes.STRING ,
        allowNull : false 
    }
})

module.exports = Hackatons