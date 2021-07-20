const express = require('express');
const connection = require('./database/database');
const Solicitacao = require('./models/Solicitacao');
const app = express();
const port = process.env.PORT || 3000;

// Testando conexão
connection.authenticate()
  .then(() => console.log("connection made successfully"))
  .catch(msgErro => console.log(msgErro))

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.get("/", (req, res) => {
  Solicitacao.findAll({
    raw: true,
    order: [[ 'id' , 'DESC']]
  })
    .then(solicitacoes => {
      res.render("index", {
        solicitacoes: solicitacoes
      });
  });
});

app.post("/salvarform", (req, res) => {
  let titulo = req.body.titulo;
  let prioridade = req.body.prioridade;
  let cliente = req.body.cliente;
  let solicitante =req.body.solicitante;
  let sistema = req.body.sistema;
  let categoria = req.body.categoria;
  let solicitacao = req.body.solicitacao;
  // let anexos = req.body.anexos;
  let status = req.body.status;
  let resposta = req.body.resposta;
  
  if(Array.isArray(prioridade)) {
    prioridade = prioridade[0];
  }

  Solicitacao.create({
    titulo: titulo,
    prioridade: prioridade,
    cliente: cliente,
    solicitante: solicitante,
    sistema: sistema,
    categoria: categoria,
    solicitacao: solicitacao,
    status: status,
    resposta: resposta
  }).then(() => {
    res.redirect("/");
  }).catch(msqErro => console.log(msqErro))

});

app.listen(port, () => console.log(`Server Running in http://localhost:${port}`));