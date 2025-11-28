const express = require("express");
const router = express.Router();
const { Projeto } = require("../models");

router.get("/", async (req, res) => {
  const projetos = await Projeto.findAll();
  res.json(projetos);
});

router.post("/", async (req, res) => {
  const { titulo, descricao, link, techs } = req.body;
  const techArray = Array.isArray(techs) ? techs : [techs];

  const projeto = await Projeto.create({
    titulo,
    descricao,
    link,
    techs: techArray,
  });

  res.status(201).json(projeto);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, link, techs } = req.body;

  const projeto = await Projeto.findByPk(id);
  if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });

  projeto.titulo = titulo;
  projeto.descricao = descricao;
  projeto.link = link;
  projeto.techs = Array.isArray(techs) ? techs : [techs];

  await projeto.save();
  res.json(projeto);
});

router.delete("/:id", async (req, res) => {
  const projeto = await Projeto.findByPk(req.params.id);
  if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });

  await projeto.destroy();
  res.json({ message: "Projeto removido" });
});

module.exports = router;
