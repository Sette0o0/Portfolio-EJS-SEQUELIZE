const sequelize = require("../config/database");
const Estudante = require("./Estudante");
const Disciplina = require("./Disciplina");
const Tecnologia = require("./Tecnologia");
const Projeto = require("./Projeto");
const Contato = require("./Contato");
const ProjetoTecnologia = require("./ProjetoTecnologia")

async function syncDB() {
  await sequelize.sync({ alter: true });
}

module.exports = {
  sequelize,
  Estudante,
  Disciplina,
  Tecnologia,
  Projeto,
  Contato,
  ProjetoTecnologia,
  syncDB
};
