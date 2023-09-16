const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres://ahmowesk:kycvCGKvZHRU68XTh5JrJmXhNApqHDyv@rain.db.elephantsql.com/ahmowesk',  {
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