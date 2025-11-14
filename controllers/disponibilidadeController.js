// controllers/disponibilidadeController.js
const Disponibilidade = require('../models/disponibilidade');
const Usuario = require('../models/usuario');

// O 'next' foi removido: (req, res)
exports.atualizarDisponibilidade = async (req, res) => {
    try {
        const { fk_posto, fk_usuario, item, status } = req.body;
        
        if (!fk_posto || !fk_usuario || !item || !status) {
            return res.send(400, { message: 'Dados de atualização incompletos.' });
        }

        const statusValidos = ['Disponível', 'Falta', 'Tem'];
        if (!statusValidos.includes(status)) {
            return res.send(400, { message: 'Status inválido. Use: Disponível, Falta ou Tem.' });
        }

        const novaDisponibilidade = await Disponibilidade.create(req.body);

        res.send(201, novaDisponibilidade);
    } catch (error) {
        console.error('Erro ao atualizar disponibilidade:', error);
        res.send(400, { message: 'Erro ao registrar disponibilidade.', details: error.message });
    }
};

// O 'next' foi removido: (req, res)
exports.buscarStatusRecente = async (req, res) => {
    try {
        const statusRecente = await Disponibilidade.findOne({
            where: { fk_posto: req.params.postoId },
            order: [['dataAtualizacao', 'DESC']],
            include: [{ model: Usuario, attributes: ['nome'] }]
        });
        
        if (!statusRecente) {
            return res.send(404, { message: 'Nenhuma atualização de status encontrada para este posto.' });
        }

        res.send(200, statusRecente);
    } catch (error) {
        console.error(error);
        res.send(500, { message: 'Erro interno ao buscar status.' });
    }
};