const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const receitas = require("./routes/api/receitas");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect Mongo
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Conectado ao BD."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/receitas", receitas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server iniciado na porta ${port}`));