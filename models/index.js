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

Projeto.belongsToMany(Tecnologia, {
  through: ProjetoTecnologia,
  foreignKey: "projeto_id"
});

Tecnologia.belongsToMany(Projeto, {
  through: ProjetoTecnologia,
  foreignKey: "tecnologia_id"
});


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
