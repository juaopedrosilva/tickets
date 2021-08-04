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

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req, res) => {
  Solicitacao.findAll({
    raw: true,
    order: [['id', 'DESC']]
  })
    .then(solicitacoes => {
      let quantBug = 0, quantNews = 0, quantCorrecao = 0, quantConcluido = 0;
      
      solicitacoes.forEach(element => {
        if(element.categoria == "bug" && element.status !== "concluido") quantBug++;
        if(element.categoria == "correcao" && element.status !== "concluido") quantCorrecao++;
        if(element.categoria == "novidade" && element.status !== "concluido") quantNews++;
        if(element.status == "concluido") quantConcluido++;
      });

      res.render("index", {
        solicitacoes: solicitacoes,
        quantidadeCategorias: [quantBug, quantNews, quantCorrecao, quantConcluido] 
      });
    });
});

app.post("/salvarform", (req, res) => {
  let titulo = req.body.titulo;
  let prioridade = req.body.prioridade;
  let cliente = req.body.cliente;
  let solicitante = req.body.solicitante;
  let sistema = req.body.sistema;
  let categoria = req.body.categoria;
  let solicitacao = req.body.solicitacao;
  // let anexos = req.body.anexos;
  let status = req.body.status;
  let resposta = req.body.resposta;

  if (Array.isArray(prioridade)) {
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

app.get("/solicitacao/:id", (req, res) => {
  let id = req.params.id;

  Solicitacao.findOne({
    where: { id: id }
  }).then(solicitacao => {
    if (solicitacao) { // Solicitação encontrada
      res.render("solicitacao", {
        solicitacao: solicitacao
      });
    }
    else { // Solicitação não encontrada
      res.redirect("/");
    }
  })

});

app.post("/updateform", (req, res) => {
  let id = req.body.id;
  let titulo = req.body.titulo;
  let prioridade = req.body.prioridade;
  let cliente = req.body.cliente;
  let solicitante = req.body.solicitante;
  let sistema = req.body.sistema;
  let categoria = req.body.categoria;
  let solicitacao = req.body.solicitacao;
  // let anexos = req.body.anexos;
  let status = req.body.status;
  let resposta = req.body.resposta;

  if (Array.isArray(prioridade)) {
    prioridade = prioridade[0];
  }

  Solicitacao.update({
    titulo: titulo,
    prioridade: prioridade,
    cliente: cliente,
    solicitante: solicitante,
    sistema: sistema,
    categoria: categoria,
    solicitacao: solicitacao,
    status: status,
    resposta: resposta
  }, 
  { where: { id: id } })
    .then(() => {
      console.log("update with success");
      res.redirect("/");
    })
    .catch(msgErro => console.log(msgErro))
});

app.listen(port, () => console.log(`Server Running in http://localhost:${port}`));