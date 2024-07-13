const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados para armazenar o código de validação gerado para mudar a senha de acesso
 *          timestamps na definição faz o mongodb incluir os registros de data e hora de criação, alteração etc.
 * @author J. Barbosa
 * 
 */
const codeValidSchema = new mongoose.Schema(
  {

    generatedCode: { type: String, required: true  },
    email: { type: String, required: true, unique: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("validCode",codeValidSchema);