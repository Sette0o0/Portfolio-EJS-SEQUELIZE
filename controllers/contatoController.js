const express = require("express");
const router = express.Router();
const { Contato } = require("../models");

router.get("/", async (req, res) => {
  const contato = await Contato.findByPk(1);
  res.json(contato);
});

router.post("/", async (req, res) => {
  const { email, telefone } = req.body;

  let contato = await Contato.findByPk(1);

  if (!contato) {
    contato = await Contato.create({ id: 1, email, telefone });
  } else {
    contato.email = email ?? contato.email;
    contato.telefone = telefone ?? contato.telefone;
    await contato.save();
  }

  res.status(201).json(contato);
});

router.delete("/", async (req, res) => {
  const contato = await Contato.findByPk(1);
  if (contato) await contato.update({ email: null, telefone: null });

  res.json({ message: "Contato removido" });
});

module.exports = router;
