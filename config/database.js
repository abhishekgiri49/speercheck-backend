const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('basic', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;