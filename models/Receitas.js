const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ReceitaSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  titulo: String,
  categoria: String,
  quantidade_ingre: Number,
  likes_mensais: Number,
  likes_total: Number,
  image_urls: [String],
  ingredientes: [[]],
  modo_de_preparo: [[]],
  autor: String,
  tempo_de_preparo: String,
  porcoes: Number
});

module.exports = Receita = mongoose.model("receitas", ReceitaSchema);
