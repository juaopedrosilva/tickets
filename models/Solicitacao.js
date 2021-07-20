const Sequelize = require('sequelize');
const connection = require('../database/database');

const Solicitacao = connection.define('solicitacaos', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prioridade: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cliente: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  solicitante: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  sistema: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  solicitacao: {
    type: Sequelize.TEXT,
    allowNull: false
  }, 
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resposta: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

Solicitacao.sync({ force: false })
  .then(() => console.log("table created on success"))
  .catch(msgErro => console.log(msgErro))

module.exports = Solicitacao;