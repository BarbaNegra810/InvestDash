const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados para armazenar os registros dos usuários
 *          timestamps na definição faz o mongodb incluir os registros de data e hora de criação, alteração etc.
 * @author J. Barbosa
 * 
 */
const UserSchema = new mongoose.Schema(
  {
    nomeUsuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    endereco: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: Number },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usuario",UserSchema);