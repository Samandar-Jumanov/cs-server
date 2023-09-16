const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres://lllbhryb:i03n6GJIUC1s8Srzxy2HaBHStyfCLvdp@satao.db.elephantsql.com/lllbhryb',  {
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