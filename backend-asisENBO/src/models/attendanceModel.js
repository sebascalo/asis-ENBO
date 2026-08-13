const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const Attendance = db.define('attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('presente', 'ausente'),
        allowNull: false,
        defaultValue: 'ausente'
    },
    hasExcuse: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    observacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
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

module.exports = Attendance;