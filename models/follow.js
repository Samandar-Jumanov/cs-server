const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");


const FollowingUsers = sequelize.define('followingUsers', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
    },
    userId : {
        type : DataTypes.INTEGER ,
         allowNull : true         
    },
    folowingUserId : {
        type : DataTypes.INTEGER ,
         allowNull : true   
    },
    followingUsername : {
        type : DataTypes.STRING  ,
         allowNull : true   
    }
})


const Followers = sequelize.define('followers', {
     id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true
     },
     followerUsername : {
        type : DataTypes.STRING,
        allowNull : false 
     },
     followerUserId : {
        type : DataTypes.INTEGER,
        allowNull : false
     },
     userId : {
        type : DataTypes.INTEGER,
        allowNull : false

     }
})

module.exports = {
    Followers ,
    FollowingUsers
}