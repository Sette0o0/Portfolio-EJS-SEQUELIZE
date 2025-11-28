const sequelize = require("./database");
const { Tecnologias, estudante, disciplinas, projetos } = require("../dados");
const Contato = require("../models/Contato");

async function seedDatabase() {
  await sequelize.query(
    "INSERT INTO estudantes (nome, curso, instituicao, anoIngresso) VALUES (?, ?, ?, ?)",
    {
      replacements: [
        estudante.nome,
        estudante.curso,
        estudante.instituicao,
        estudante.anoIngresso
      ]
    }
  );

  await Contato.findOrCreate({
    where: { id: 1 },
    defaults: {
      email: "meuemail@email.com",
      telefone: "(00) 00000-0000"
    }
  });

  for (let d of disciplinas) {
    await sequelize.query(
      "INSERT INTO disciplinas (nome) VALUES (?)",
      { replacements: [d] }
    );
  }

  for (let key in Tecnologias) {
    await sequelize.query(
      "INSERT INTO tecnologia (chave, nome) VALUES (?, ?)",
      { replacements: [key, Tecnologias[key]] }
    );
  }

  for (let p of projetos) {

    await sequelize.query(
      "INSERT INTO projetos (titulo, descricao, link) VALUES (?, ?, ?)",
      { replacements: [p.titulo, p.descricao, p.link] }
    );

    const [rows] = await sequelize.query(
      "SELECT id FROM projetos WHERE titulo = ? LIMIT 1",
      { replacements: [p.titulo] }
    );

    const projetoId = rows[0].id;

    for (let t of p.techs) {
      const chaveDaTech = Object.entries(Tecnologias).find(([k, v]) => v === t)?.[0];

      if (!chaveDaTech) {
        console.error("Tecnologia não encontrada:", t);
        continue;
      }

      const [tecnologiaRows] = await sequelize.query(
        "SELECT id FROM tecnologia WHERE chave = ?",
        { replacements: [chaveDaTech] }
      );

      const tecnologiaId = tecnologiaRows[0].id;

      await sequelize.query(
        "INSERT INTO projeto_tecnologia (projeto_id, tecnologia_id) VALUES (?, ?)",
        { replacements: [projetoId, tecnologiaId] }
      );
    }
  }
}

module.exports = { seedDatabase };
