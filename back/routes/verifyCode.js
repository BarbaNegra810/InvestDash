const router = require("express").Router();
const ValidCode = require("../models/validCode");
const util = require("../utils/util");




router.post("/verifyCode", async ( req,res) => { 
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send('E-mail ou código não informado');
  }

  try {
    const validCode = await util.verifyCode(email,code);

    if (validCode === "NEGADO") {
      return res.status(404).send('Código inválido');
    }

    

    if (validCode === "VALIDADO") {
      res.status(200).send('Código de verificação válido');
    } else {
      res.status(400).send('Código inválido');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

);

module.exports = router;
