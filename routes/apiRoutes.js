// routes/apiRoutes.js
const usuarioController = require('../controllers/usuarioController');
const postoController = require('../controllers/postoController');
const dispController = require('../controllers/disponibilidadeController');

// Função para aplicar todas as rotas ao servidor Restify
module.exports = (server) => {
    // Rotas de Usuário (Autocadastro)
    server.post('/api/usuarios', usuarioController.cadastrarUsuario);
    server.get('/api/usuarios', usuarioController.listarUsuarios);
    // PUT /api/usuarios/:id (Atualizar)
    // DELETE /api/usuarios/:id (Excluir)

    // Rotas de Posto de Saúde (Cadastro feito pelo usuário)
    server.post('/api/postos', postoController.cadastrarPosto);
    server.get('/api/postos', postoController.listarPostos);
    // PUT /api/postos/:id (Atualizar)
    // DELETE /api/postos/:id (Excluir)

    // Rotas de Disponibilidade (Atualização do estoque pelo usuário)
    server.post('/api/disponibilidade', dispController.atualizarDisponibilidade);
    server.get('/api/postos/:postoId/status', dispController.buscarStatusRecente);
};