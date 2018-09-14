const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ReceitaSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  quantidade_ingre: Number,
  likes_mensais: Number,
  likes_total: Number,
  image_urls: [String],
  ingredientes: [
    []
  ],
  ingredientes: [
    []
  ],
  autor: String,
  tempo_de_preparo: String,
  porcoes: Number

});

module.exports = Receita = mongoose.model("receitas", ReceitaSchema);