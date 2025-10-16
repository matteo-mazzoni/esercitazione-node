const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/userdatabase');

const Todo = sequelize.define('Todo', {
title: {
    type: DataTypes.STRING,
    allowNull: false,
    },
description: {
    type: DataTypes.TEXT,
    allowNull: true,
    },
completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    },
},
{
tableName: 'todos',
timestamps: true,
});