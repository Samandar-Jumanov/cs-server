const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://samandarjumanov:R89pzY1ZLn7HFuuVWZ9lxnoXW1vadoDw@dpg-cjqsc38jbais738niub0-a/db_code_sender', {
  dialect: 'postgres',
});

module.exports = sequelize