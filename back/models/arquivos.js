const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados para armazenar os detalhes dos arquivos PDF já carregados pelos usuários
 *          
 * @author J. Barbosa
 * 
 */
const ArquivosSchema = new mongoose.Schema(
  {
     nome_arquivo: {type: string, required: true, unique: true }

      },
  { timestamps: true }
);

module.exports = mongoose.model("arquivos",ArquivosSchema);