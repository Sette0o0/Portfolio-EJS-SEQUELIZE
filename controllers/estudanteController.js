const express = require("express");
const router = express.Router();
const { Estudante } = require("../models");

router.get("/", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  res.json(estudante);
});

// olha, como só tem um estudante ent criar um estudante é a mesma coisa que atualizar ele
router.post("/", async (req, res) => {
  let estudante = await Estudante.findByPk(1);

  if (!estudante) {
    estudante = await Estudante.create({ id: 1, ...req.body });
  } else {
    await estudante.update(req.body);
  }

  res.status(201).json(estudante);
});

router.delete("/", async (req, res) => {
  const estudante = await Estudante.findByPk(1);
  if (estudante) await estudante.destroy();
  res.json({ message: "Dados removidos" });
});

module.exports = router;
