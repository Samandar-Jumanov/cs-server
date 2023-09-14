const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


const ShareProblems = sequelize.define('problems', {
  id :{
      type : DataTypes.INTEGER,
      autoIncrement : true ,
      primaryKey : true 
  },
  problem :{
      type : DataTypes.STRING ,
      allowNull : false ,
      unique : true 
  },
  userId : {
      type : DataTypes.INTEGER ,
      allowNull : false 
  },
  isSolved : {
      type : DataTypes.BOOLEAN ,
      allowNull : false,
      defaultValue : false 
  }
})


ShareProblems.belongsTo(Users , { foreignKey : 'userId'})
Users.hasMany(ShareProblems , { foreignKey :'userId', as :'problems'})


sequelize.sync().then(()=>{
  console.log('DB is working ')
}).catch((error)=>{
  console.log(error)
})


module.exports = {
  Users,
};