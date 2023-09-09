const {DataTypes } = require('sequelize')
const sequelize = require('../utils/db')
const { SentSolutions, RecievedSolutions  } = require('./solutions')
const SharedProblems = require('./sharedProblems')


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
Users.hasMany(SharedProblems , {
    as :'sharedProblems'
})

//Sent solutions and users 
Users.hasMany(SentSolutions , {
     as :'sentSolutions'
})

//Recieved Solutions 

Users.hasMany(RecievedSolutions,{
     as :'recievedSolutions'
})




module.exports = Users
