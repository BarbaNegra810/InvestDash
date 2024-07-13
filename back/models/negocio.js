const mongoose = require("mongoose");

/**
 * @summary Define o modelo de dados para armazenar os registros de um negócio 
 *          timestamps na definição faz o mongodb incluir os registros de data e hora de criação, alteração etc.
 * @author J. Barbosa
 * 
 */
const NegocioSchema = new mongoose.Schema(
  {
    ind_q: { type: String },
    tipo_negociacao: { type: String },
    tipo_operacao: { type: String, required: true },
    tipo_mercado: { type: String },
    codigo_titulo: {type: String, required: true},
    especificacao_titulo: { type: String },
    qtd_negociada: { type: Number, required: true },
    preco: { type:  mongoose.Types.Decimal128, required: true },
    valor_total: { type: mongoose.Types.Decimal128, required: true },
    ind_movimento: { type: String },
    data_negocio: { type: Date, required: true},
    corretora: { type: String, required: true},
    usuario: { type: String, required: true},

      },
  { timestamps: true }
);

module.exports = mongoose.model("negocio",NegocioSchema);