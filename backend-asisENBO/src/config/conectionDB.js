const {Sequelize} = require('sequelize');

const db = new Sequelize(
        database = "asisenbo",
        username = "root",
        password = "Se.calo52004D",
    {

        dialect: "mysql",
        host: "localhost",
        port: 3306
    }
);

module.exports = db;