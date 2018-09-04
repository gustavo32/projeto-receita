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
  }
});

module.exports = Receita = mongoose.model("receita", ReceitaSchema);
