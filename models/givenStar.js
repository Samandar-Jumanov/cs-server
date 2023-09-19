const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");


const GivenStars = sequelize.define('givenStars', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    givenStarUsername : {
        type : DataTypes.JSONB,
        allowNull : false 
    },
    givenStarUserId : {
        type : DataTypes.INTEGER
    }
    
})

module.exports = GivenStars
