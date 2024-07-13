const router = require("express").Router();
const Usuario = require("../models/Usuario");
const util = require("../utils/util");

/**
 * Valida um usuário para recebimento do token de acesso
 */

router.post("/login", async (req, res) => {
  console.log("Login Request", req.body);

  try {
    const user = await Usuario.findOne({ email: req.body.email });
    
    if (!user) {
      res.status(401).json("Credenciais de acesso inválidas");
    } else {

      const passwordIsValid = await util.checkPass(req.body.password, user.password);

      if (passwordIsValid) {
        //Para retornao ao client as informaões sem o campo password, fazemos o destruct do objeto
        // user, mas o mongodb tem muitos campos de controle, e os dados em si estão no campo _doc.
        const {password, ...userData} = user._doc;
        console.log(userData);
        const token = await util.createToken(userData._id, userData.isAdmin);
        res.status(200).json({...userData, token});
      } else { 
        res.status(401).json("Credenciais de acesso inválidas");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/forgot-password",util.authorize, (req, res) => {
  

});

module.exports = router;
