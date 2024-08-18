const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados usado para armazenar as informaçõs dos usuários do sistema
 *          
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