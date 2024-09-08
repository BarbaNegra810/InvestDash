const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados usado para armazenar de usuários que logaram no sistema
 *          
 * @author J. Barbosa
 * 
 */
const UserSchema = new mongoose.Schema(
  {
    nomeUsuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },   
  },
  { timestamps: true }
);

module.exports = mongoose.model("auditLogin",UserSchema);