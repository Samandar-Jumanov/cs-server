const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://duziqiyt:7l8FX113o_i33dChBEBLs2vcEJWWgD3W@rain.db.elephantsql.com/duziqiyt',  {
  
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