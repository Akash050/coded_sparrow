

const Sequelize = require('sequelize')

let database = new Sequelize(
  'askrango',
  'askrango',
  'askrango', {
  host: 'db4free.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
},
);

module.exports = database;
