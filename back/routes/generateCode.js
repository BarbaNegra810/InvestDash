const router = require("express").Router();
const ValidCode = require("../models/validCode");
const util = require("../utils/util");

/**
 * Gerar e guardar o código para validação da troca de senha
 *
 */
router.post("/generateCode", async (req, res) => {
  // Função para gerar um código aleatório de 6 dígitos
  function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).send('E-mail não informado');
  }

  const generatedCode = generateRandomCode();

  try {
    const updatedCode = await ValidCode.findOneAndUpdate(
      { email },
      { generatedCode },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const response = await util.sendMail(email,updatedCode.generatedCode);

    res.status(201).send({ message: 'Codigo gerado com sucesso. ' + response });
  } catch (err) {
    res.status(500).send(err );
  }
});


module.exports = router;
