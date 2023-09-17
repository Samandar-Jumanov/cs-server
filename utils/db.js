const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres://Samandar-Jumanov:q6jrkSF7UVnN@ep-bitter-bar-02291163.us-east-2.aws.neon.tech/neondb?sslmode=require',  {
  dialect :'postgres'
});

module.exports = sequelize;

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize 