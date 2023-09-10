const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://samandarjumanov:R89pzY1ZLn7HFuuVWZ9lxnoXW1vadoDw@dpg-cjqsc38jbais738niub0-a:5432/db-code-sender', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize