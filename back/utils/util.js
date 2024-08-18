const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const ValidCode = require("../models/validCode");

/**
 * Funções
 */
var util = {};

/**
 * Verifica se o código de reset de senha informado existe e é valido
 * @param {*} email 
 * @param {*} code 
 * @returns NEGADO ou VALIDADO
 */
util.verifyCode = async function (email, code) {
  try {
    const validCode = await ValidCode.findOne({ email });

    if (!validCode) {
      //Não houve envio de código para o e-mail informado
      return "NEGADO";
    }

    const currentTime = new Date();
    const codeTime = new Date(validCode.updatedAt);
    const timeDifference = (currentTime - codeTime) / (1000 * 60 * 60); // Diferença de 2 horas

    if (validCode.generatedCode === code && timeDifference <= 2) {
      //Existe o código e está válido ainda
      return "VALIDADO";
    } else {
      //Existe o código na base, mas já expirou
      return "NEGADO";
    }
  } catch (err) {
    return err;
  }

}

/**
 * Criptografa uma senha e retorna o hash
 * @param {*} plainPassword  - A senha a ser criptografada
 * @returns {*} - A senha criptografada ou um objeto com um erro caso ocorra
 */
util.hash = async function (plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    return err;
  }
};

/**
 * Checa se a senha informada é válida
 * @param {*} plainPassword  - A senha informada
 * @param {*} hashedPassword  - A senha criptografada gravada no BD
 * @returns {boolean}
 */
util.checkPass = async function (plainPassword, hashedPassword) {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};


/**
 * Cria o token de autenticação para acesso às funcionalidades da aplicação
 * @param {*} userId - O id do user gerado no BD
 * @param {*} isAdmin - Indica se esse user é um admin
 */
util.createToken = async function (userId, isAdmin) {
  //Podemos inserir informações no token para posterior uso na verificação
  const accToken = jwt.sign(
    { id: userId, isAdmin: isAdmin },
    process.env.SEC_W,
    { expiresIn: "1d" }
  );
  return accToken;
};

/**
 *
 * @param {*} req - Dados recebidos na requisição
 * @param {*} res - Objeto para envio de resposta
 * @param {*} next - Objeto para continuar a partir do chamador
 * @returns permite seguir ou um erro
 */
util.validateToken = async function (req, res, next) {
  const token = req.headers.token; // lê o token enviado como header
  if (token) {
    //verifica o token contra a minha chave
    jwt.verify(token, process.env.SEC_W, (err, autData) => {
      if (err) res.status(403).json("Token is not valid");
      console.log("AutData", autData);
      req.autData = autData; // aplia a req para ter os dados de validação do token
      next();
    });
  } else {
    return res.status(401).json("Not Authenticated");
  }
};

util.authorize = async function (req, res, next) {
  util.validateToken(req, res, () => {
    if (req.autData.id === req.params.id || req.autData.isAdmin) {
      next();
    } else {
      res.status(403).json("Permission Denied");
    }
  });
};

util.sendMail = async function (email, validCode) {
 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "investdash@investdash.me", 
    subject: "investdash - Reset de Senha de acesso",
    text: "Para trocar a sua senha de acesso informe o código " + validCode + ". Caso não tenha solicitado, ignore este e-mail e certifique-se de que sua conta está acessível",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background: linear-gradient(to right, #0000FF, #87CEFA); padding: 20px; text-align: left;">
          <h1 style="color: #fff; margin: 0;">InvestDash</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #000;">Reset de Senha de Acesso</h2>
          <p style="font-size: 16px;">Para trocar a sua senha de acesso, informe o código abaixo:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #000;">${validCode}</span>
          </div>
          <p style="font-size: 16px;">Caso não tenha solicitado, ignore este e-mail e certifique-se de que sua conta está acessível.</p>
        </div>
        <div style="padding: 10px; background-color: #f4f4f4; text-align: center;">
          <p style="font-size: 12px; color: #666;">&copy; 2024 InvestDash. Todos os direitos reservados.</p>
        </div>
      </div>
    `,
  };
 
  sgMail
    .send(msg)
    .then(() => {
      console.log("Foi...");
      return "Enviado";
    })
    .catch((error) => {
      console.error(error);
      return "Erro";
    });
};


module.exports = util;
