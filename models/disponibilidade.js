// models/disponibilidade.js
const Sequelize = require('sequelize');
const database = require('../db');
const PostoDeSaude = require('./postoDeSaude');
const Usuario = require('./usuario');

const Disponibilidade = database.define('disponibilidade', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    item: {
        type: Sequelize.ENUM('Insulina NPH', 'Insulina Regular', 'Tiras de Glicose', 'Outro'),
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
        // 'Disponível' (com qté > 0), 'Falta' (com qté = 0), 'Tem' (sem qté específica)
        type: Sequelize.ENUM('Disponível', 'Falta', 'Tem'),
        allowNull: false
    },
    dataAtualizacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

// Relacionamentos
Disponibilidade.belongsTo(PostoDeSaude, {
    constraint: true,
    foreignKey: 'fk_posto'
});
PostoDeSaude.hasMany(Disponibilidade, {
    foreignKey: 'fk_posto'
});

Disponibilidade.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'fk_usuario'
});
Usuario.hasMany(Disponibilidade, {
    foreignKey: 'fk_usuario'
});

module.exports = Disponibilidade;