const express = require("express");
const router = express.Router();

const User = require("../../models/User.js");

router.post("/signup", (req, res, next) => {
  const { body } = req;
  const { nome, senha } = body;
  let { email } = body;

  if (!nome) {
    return res.send({
      success: false,
      message: "Erro: O campo nome não pode ser vazio"
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Erro: O campo email não pode ser vazio"
    });
  }
  if (!senha) {
    return res.send({
      success: false,
      message: "Erro: O campo senha não pode ser vazio"
    });
  }
  email = email.toLowerCase();
  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Erro no Servidor"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Conta já existente"
        });
      }
    }
  );

  const newUser = new User();
  newUser.email = email;
  newUser.nome = nome;
  newUser.senha = newUser.generateHash(senha);
  newUser.save((err, user) => {
    if (err) {
      res.end({
        success: false,
        message: "Erro no Cadastro"
      });
    }
    res.end({
      success: true,
      message: "Sucesso no Cadastro"
    });
  });
});

module.exports = router;
