const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres://vhtclsyo:JLXpLUPoshEy0TW89RTxssMqC89fF9Vm@rain.db.elephantsql.com/vhtclsyo',  {
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