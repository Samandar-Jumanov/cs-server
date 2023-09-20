const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");


const Messages = sequelize.define('messages', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    message :{
        type : DataTypes.JSONB,
        allowNull : false 
    },
    userId :  {
        type : DataTypes.INTEGER,
        allowNull : false 
    },
    recieverUserId : {
        type : DataTypes.INTEGER,
        allowNull : false 
    },
    
    from : {
        type :DataTypes.STRING ,
        allowNull : false 
    }
    
})


module.exports ={
    Messages 
}

