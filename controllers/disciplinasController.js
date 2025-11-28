const express = require("express");
const router = express.Router();
const { Disciplina } = require("../models");

router.get("/", async (req, res) => {
  const disciplinas = await Disciplina.findAll();
  res.json(disciplinas);
});

router.post("/", async (req, res) => {
  const { nome } = req.body;
  const disciplina = await Disciplina.create({ nome });
  res.status(201).json(disciplina);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const disciplina = await Disciplina.findByPk(id);
  if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });

  disciplina.nome = nome;
  await disciplina.save();

  res.json(disciplina);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const disciplina = await Disciplina.findByPk(id);
  if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });

  await disciplina.destroy();
  res.json({ message: "Disciplina removida" });
});

module.exports = router;
