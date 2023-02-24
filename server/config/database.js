const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('movieFlex', 'irfan', '123456', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
