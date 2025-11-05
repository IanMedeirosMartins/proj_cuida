//index.js
(async() => {
    const database = require('./db');
    const Produto = require('./produto');
    

    try {
        const resultado = await database.sync();
        console.log(resultado);

        const resultadoCreate = await Produto.create({
            name: 'mouse',
            preco: 10,
            descricao: 'um mouse USB LINDO'
        })
        console.log(resultadoCreate);
    } catch (error){
        console.log(error);
    }
})()
const http = require('http');
http.createServer(async(req,res) => {
    if (req.url === '/produtos'){
        try{
        const produtos = await Produto.findAll();
        res.writehead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(produtos));
     }catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.writeHead(500, {'Content-Type':'application/json'});
     }
    }else {
        res.writehead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(`
            <h1>Bem-vindo à API de produtos!</h1>
            <p>
                Clique <a href="/produtos">aqui</a> para ver a lista de produtos em formato
            </p>
        `);
    }
}).listen(3000, () => console.log('Servidor rodado na porta 3000'));
