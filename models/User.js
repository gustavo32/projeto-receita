const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  nome: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  senha: {
    type: String,
    default: ""
  },
  likes: [],
  ingredientes: {
    type: Array,
    default: []
  }
});

UserSchema.methods.generateHash = function(senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(senha) {
  return bcrypt.compareSync(senha, this.senha);
};

module.exports = Receita = mongoose.model("User", UserSchema);
