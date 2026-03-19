// server.js (Na pasta raiz)
const restify = require('restify');
const path = require('path'); // Módulo 'path' importado corretamente

const database = require('./db');
const applyRoutes = require('./routes/apiRoutes');

// Importa os Models
const Usuario = require('./models/usuario');
const PostoDeSaude = require('./models/postoDeSaude');
const Disponibilidade = require('./models/disponibilidade');

// --- 1. Sincronização do Banco de Dados ---
async function setupDatabase() {
    try {
            await database.sync({ force: false }); 
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
                                            server.use(restify.plugins.bodyParser()); 
                                            server.use(restify.plugins.acceptParser(server.acceptable));
                                            server.use(restify.plugins.queryParser());

                                            // Permite requisições de origens diferentes (CORS)
                                            server.pre(function(req, res, next) {
                                                res.header('Access-Control-Allow-Origin', '*'); 
                                                    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                                                        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
                                                            
                                                                if (req.method === 'OPTIONS') {
                                                                        res.send(200);
                                                                                return next(false);
                                                                                    }
                                                                                        return next();
                                                                                        });


                                                                                        // --- 3. Aplica as Rotas (APIs) ---
                                                                                        // As rotas API (/api/...) devem vir primeiro para serem priorizadas
                                                                                        applyRoutes(server);

                                                                                        // --- 4. Servir Arquivos Estáticos ---
                                                                                        // Serve a pasta 'html' como raiz do site (/)
                                                                                        // CORREÇÃO: Substituído o RegExp por '/*'
                                                                                        server.get('/*', restify.plugins.serveStatic({ 
                                                                                            directory: path.join(__dirname, 'html'), 
                                                                                                default: 'index.html',
                                                                                                    appendRequestPath: false
                                                                                                    }));


                                                                                                    // --- 5. Iniciar o Servidor ---
                                                                                                    const PORT = 3000;
                                                                                                    server.listen(PORT, function() {
                                                                                                        console.log(`✅ Servidor ${server.name} rodando em http://localhost:${PORT}`);
                                                                                                            console.log(`Endpoints API em /api/...`);
                                                                                                            });