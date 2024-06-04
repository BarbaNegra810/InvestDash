const bcrypt = require("bcrypt");



//Contém as funções utilitárias
var util = {};

util.hash = async function(plainPassword) {

  const HASH_SALT = 8;

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, HASH_SALT);
    return hashedPassword;
  } catch (err) {
    return err;
  }
}
module.exports = util;
