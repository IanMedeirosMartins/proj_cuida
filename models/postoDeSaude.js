// models/postoDeSaude.js
const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario');

const PostoDeSaude = database.define('postoDeSaude', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

// Relacionamento: Um Usuário cadastra N Postos
PostoDeSaude.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'fk_usuario'
});
Usuario.hasMany(PostoDeSaude, {
    foreignKey: 'fk_usuario'
});

module.exports = PostoDeSaude;