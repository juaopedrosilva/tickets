const Sequelize = require('sequelize');

const connection = new Sequelize('tickets', 'root', 'origamid', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;