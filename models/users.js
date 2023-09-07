const {DataTypes } = require('sequelize')
const sequelize = require('../utils/db')


const Users = sequelize.define('users', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    username : {
        type : DataTypes.STRING ,
        allowNull : false ,
        unique : true 
    },
    password : {
        type : DataTypes.STRING ,
        allowNull : false 
    }, 
    token :{
       type: DataTypes.STRING ,
       allowNull : false 
    }
})



module.exports = Users
