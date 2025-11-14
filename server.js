// server.js (Na pasta raiz, substitui o antigo index.js)
const restify = require('restify');
const database = require('./db');
const applyRoutes = require('./routes/apiRoutes');

// Importa os Models para garantir que sejam carregados e sincronizados
const Usuario = require('./models/usuario');
const PostoDeSaude = require('./models/postoDeSaude');
const Disponibilidade = require('./models/disponibilidade');

// --- 1. Sincronização do Banco de Dados ---
async function setupDatabase() {
    try {
        // Sincroniza todos os modelos (cria as tabelas e suas relações)
        await database.sync({ force: false }); // Use 'force: true' apenas para resetar o BD durante o desenvolvimento
        console.log('Database e tabelas sincronizadas com sucesso.');
    } catch (error) {
        console.error('❌ Erro ao sincronizar database:', error);
    }
}
setupDatabase();

// --- 2. Configuração do Servidor Restify ---
const server = restify.createServer({
    name: 'AlertaDiabetesAPI',
    version: '1.0.0'
});

// Middlewares essenciais
server.use(restify.plugins.bodyParser()); // Processa o JSON no corpo da requisição
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

// ⚠️ Permite requisições de origens diferentes (CORS) - ESSENCIAL para o Front-end
server.pre(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer domínio
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
    // Responde a requisições OPTIONS imediatamente (pré-voo CORS)
    if (req.method === 'OPTIONS') {
        res.send(200);
        return next(false);
    }
    return next();
});


// --- 3. Aplica as Rotas ---
applyRoutes(server);

// --- 4. Iniciar o Servidor ---
const PORT = 3000;
server.listen(PORT, function() {
    console.log(`✅ Servidor ${server.name} rodando em http://localhost:${PORT}`);
    console.log(`Endpoints disponíveis em /api/...`);
});