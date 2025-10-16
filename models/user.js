const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/userdatabase');

const User = sequelize.define('User', {
username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
},

{
    tableName: 'users',
    timestamps: true,
});

module.exports = User;