const Usuario = require('../models/usuario');

exports.loginGoogle = async (req, res) => {
    try {
        const { nome, email, googleId } = req.body;

        console.log("Tentativa de login Google para:", email);

        if (!email || !googleId) {
            return res.send(400, { message: 'Email e Google ID são obrigatórios para o login' });
        }

        // Busca o usuário pelo e-mail. Se não existir, cria um novo com os dados do corpo.
        const [usuario, criado] = await Usuario.findOrCreate({
            where: { email },
            defaults: { nome, googleId }
        });

        // Caso o usuário já existisse (criado via e-mail antes), mas sem vínculo com Google, atualizamos
        if (!criado && !usuario.googleId) {
            await usuario.update({ googleId });
        }

        res.send(200, { message: 'Login realizado com sucesso', usuario });
    } catch (error) {
        console.error('ERRO CRÍTICO NO BACKEND:', error);
        res.send(500, { 
            message: 'Erro interno no servidor ao processar login', 
            error: error.message,
            stack: error.stack 
        });
    }
};