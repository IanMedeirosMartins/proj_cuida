// models/usuario.js
const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    // Você pode adicionar um campo 'senha' e lógica de hash posteriormente.
});

module.exports = Usuario;