// controllers/usuarioController.js
const Usuario = require('../models/usuario');

// O 'next' foi removido: (req, res)
exports.cadastrarUsuario = async (req, res) => {
    try {
        if (!req.body.nome || !req.body.email) {
            return res.send(400, { message: 'Nome e email são obrigatórios.' });
        }
        
        const novoUsuario = await Usuario.create(req.body);
        res.send(201, novoUsuario);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.send(409, { message: 'Erro ao cadastrar usuário. O email pode já estar em uso.', details: error.message });
    }
};

// O 'next' foi removido: (req, res)
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
             attributes: ['id', 'nome', 'email', 'createdAt']
        }); 
        res.send(200, usuarios);
    } catch (error) {
        console.error(error);
        res.send(500, { message: 'Erro interno ao buscar usuários.' });
    }
};

// ...