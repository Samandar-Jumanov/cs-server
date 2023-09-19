const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Stars = sequelize.define('stars', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
     gotStartedUser :{
        type : DataTypes.JSONB,
        allowNull : false 
    },
    gotStartedUserId : {
        type : DataTypes.INTEGER
    }
    
})






module.exports = Stars