const express = require("express");
const router = express.Router();
const { Projeto, Tecnologia, ProjetoTecnologia } = require("../models");

router.get("/", async (req, res) => {
  const projetos = await Projeto.findAll({
    include: { model: Tecnologia }
  });
  res.json(projetos);
});

router.post("/", async (req, res) => {
  const { titulo, descricao, link, techs } = req.body;

  const projeto = await Projeto.create({ titulo, descricao, link });

  if (techs && techs.length > 0) {
    await projeto.setTecnologia(techs); 
  }

  const projetoCompleto = await Projeto.findByPk(projeto.id, {
    include: Tecnologia
  });

  res.status(201).json(projetoCompleto);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, link, techs } = req.body;

  const projeto = await Projeto.findByPk(id);
  if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });

  await projeto.update({ titulo, descricao, link });

  if (techs) {
    await projeto.setTecnologia(techs);
  }

  const projetoAtualizado = await Projeto.findByPk(id, {
    include: Tecnologia
  });

  res.json(projetoAtualizado);
});

router.delete("/:id", async (req, res) => {
  const projeto = await Projeto.findByPk(req.params.id);
  if (!projeto) return res.status(404).json({ error: "Projeto não encontrado" });

  await projeto.destroy();
  res.json({ message: "Projeto removido" });
});

module.exports = router;
