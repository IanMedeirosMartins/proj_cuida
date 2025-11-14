// controllers/postoController.js
const PostoDeSaude = require('../models/postoDeSaude');
const Usuario = require('../models/usuario');

// O 'next' foi removido: (req, res)
exports.cadastrarPosto = async (req, res) => {
    try {
        if (!req.body.nome || !req.body.fk_usuario || !req.body.latitude || !req.body.longitude) {
             return res.send(400, { message: 'Dados incompletos para cadastro do posto.' });
        }

        const usuario = await Usuario.findByPk(req.body.fk_usuario);
        if (!usuario) {
            return res.send(404, { message: 'Usuário (fk_usuario) não encontrado.' });
        }

        const novoPosto = await PostoDeSaude.create(req.body);
        res.send(201, novoPosto);
    } catch (error) {
        console.error('Erro ao cadastrar posto:', error);
        res.send(400, { message: 'Erro ao cadastrar posto. Nome duplicado ou dados inválidos.', details: error.message });
    }
};

// O 'next' foi removido: (req, res)
exports.listarPostos = async (req, res) => {
    try {
        const postos = await PostoDeSaude.findAll({
            include: [{ 
                model: Usuario, 
                attributes: ['nome', 'email'] 
            }],
            order: [['id', 'ASC']]
        });
        
        res.send(200, postos);
    } catch (error) {
        console.error(error);
        res.send(500, { message: 'Erro interno ao buscar postos.' });
    }
};

// ...