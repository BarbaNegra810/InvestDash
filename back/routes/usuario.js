const router = require("express").Router();
const Usuario = require("../models/Usuario");
const util = require("../utils/util");

router.post("/resetPassword", async (req, res) => {
  if (!req.body.email || !req.body.code || !req.body.password) {
    return res.status(400).json("missing parameter");
  }

  try {
    const validCode = await util.verifyCode(req.body.email, req.body.code);

    if (validCode === "NEGADO") {
      return res.status(404).send("Código inválido");
    }

    if (validCode === "VALIDADO") {
      const hashedPassword = await util.hash(req.body.password);
      
      try {
        const updatedRecord = await Usuario.findOneAndUpdate(
          { email: req.body.email },
          { $set: { password: hashedPassword } },
          { new: true }
        );
        if (!updatedRecord) {
          return res.status(404).json("Usuário não encontrado");
        }
        res.status(200).json(updatedRecord);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(400).send("Código inválido");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Registrar um novo usuário
 */
router.post("/registroUsuario", async (req, res) => {
  const newUsuario = new Usuario({
    nomeUsuario: req.body.nomeUsuario,
    email: req.body.email,
    password: await util.hash(req.body.password),
  });

  try {
    const savedUser = await newUsuario.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.code });
  }
});

/**
 * Alterar dados do usuário
 * new: true - retorna os dados alterados
 */
router.put("/usuario/:id", util.authorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = await util.hash(req.body.password);
  }

  try {
    const updatedRecord = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/usuario/:id", util.authorize, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(500).json("Faild to remove user");
  }
});

module.exports = router;
