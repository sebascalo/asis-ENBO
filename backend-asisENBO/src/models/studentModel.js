const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const Student = db.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    documentType: {
        type: DataTypes.ENUM('CC', 'CE', 'TI', 'PASAPORTE', 'OTRO'),
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Student;