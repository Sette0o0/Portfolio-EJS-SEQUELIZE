const express = require("express");
const router = express.Router();
const { Tecnologia } = require("../models");

router.get("/", async (req, res) => {
  const tecnologias = await Tecnologia.findAll();
  res.json(tecnologias);
});

router.post("/", async (req, res) => {
  const { chave, nome } = req.body;
  const tecnologia = await Tecnologia.create({ chave, nome });
  res.status(201).json(tecnologia);
});

router.put("/:chave", async (req, res) => {
  const { chave } = req.params;
  const { nome } = req.body;

  const tecnologia = await Tecnologia.findOne({ where: { chave } });
  if (!tecnologia) return res.status(404).json({ error: "Tecnologia não encontrada" });

  tecnologia.nome = nome;
  await tecnologia.save();

  res.json(tecnologia);
});

router.delete("/:chave", async (req, res) => {
  const tecnologia = await Tecnologia.findOne({ where: { chave: req.params.chave } });
  if (!tecnologia) return res.status(404).json({ error: "Tecnologia não encontrada" });

  await tecnologia.destroy();
  res.json({ message: "Tecnologia removida" });
});

module.exports = router;
