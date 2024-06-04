const router = require("express").Router();
const Usuario = require("../models/Usuario");
const util = require("../utils/util");

router.post("/registro", async (req, res) => {
  console.log("Request",req.body);
  const newUsuario = new Usuario({
    nomeUsuario: req.body.nomeUsuario,
    email: req.body.email,
    password: await util.hash(req.body.password),
  });

  try {
    const savedUser = await newUsuario.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
