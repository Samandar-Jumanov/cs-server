const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");


const UserFollowings = sequelize.define('userFollowings', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
    },
    userId : {
        type : DataTypes.INTEGER ,
         allowNull : true         
    },
    addedUserId : {
        type : DataTypes.INTEGER ,
         allowNull : true   
    },
    addedUsername : {
        type : DataTypes.STRING  ,
         allowNull : true   
    }
})


const UserFollowers = sequelize.define('userFollowers', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
    },
    userId : {
        type : DataTypes.INTEGER ,
         allowNull : true         
    },
    addedUserId : {
        type : DataTypes.INTEGER ,
         allowNull : true   
    },
    addedUsername : {
        type : DataTypes.STRING  ,
         allowNull : true   
    }
})

module.exports = {
    UserFollowers ,
    UserFollowings
}