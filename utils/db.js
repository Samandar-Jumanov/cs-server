const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://uxjgedwd:yj9IvXXQj7PuwMHOALuiocWsMdrzXNm5@rain.db.elephantsql.com/uxjgedwd',  {
  
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