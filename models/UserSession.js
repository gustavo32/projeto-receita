const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSessionSchema = new Schema({
  userId: {
    type: Number,
    default: -1
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Receita = mongoose.model("UserSession", UserSessionSchema);
