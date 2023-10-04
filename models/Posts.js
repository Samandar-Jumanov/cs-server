const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')


const Posts =  sequelize.define('posts', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    postTitle : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    postDescription : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
   code : {
    type : DataTypes.STRING ,
    allowNull : false 
   },
    userId : {
        type : DataTypes.INTEGER ,
        allowNull : false 
    }
})


module.exports = {Posts}