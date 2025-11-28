const express = require("express");
const app = express();
const port = 3000;

const apiRoutes = require("./routes");
const { syncDB, Estudante, Disciplina, Projeto, Tecnologia, Contato } = require("./models");
const { seedDatabase } = require("./config/seed")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  res.render("index", { nome: estudante?.nome });
});

app.get("/sobre", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  res.render("sobre", { estudante });
});

app.get("/disciplinas", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  const disciplinas = await Disciplina.findAll();
  res.render("disciplinas", { disciplinas, estudante });
});

app.get("/projetos", async (req, res) => {
  const estudante = await Estudante.findByPk(1);

  const projetos = await Projeto.findAll({
    include: [{ model: Tecnologia }]
  });

  const tecnologias = await Tecnologia.findAll();

  res.render("projetos", {
    projetos,
    estudante,
    Tecnologias: tecnologias
  });
});

app.get("/dashboard", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  const totalDisciplinas = await Disciplina.count();

  const projetos = await Projeto.findAll({
    include: [{ model: Tecnologia }]
  });

  const contador = {};

  projetos.forEach((p) => {
    p.Tecnologia.forEach((t) => {
      contador[t.nome] = (contador[t.nome] || 0) + 1;
    });
  });

  const tecnologias = Object.entries(contador)
    .sort((a, b) => b[1] - a[1])
    .map(([nome, qtd]) => ({ nome, qtd }));

  res.render("dashboard", {
    dados: { totalDisciplinas, totalProjetos: projetos.length, tecnologias },
    estudante,
  });
});

app.get("/contato", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  const contato = await Contato.findByPk(1);
  res.render("contato", { contato, estudante });
});

syncDB().then(() => {
  seedDatabase().then(() => {
    app.listen(port, () =>
      console.log(`Servidor rodando em http://localhost:${port}`)
    );
  })
});
