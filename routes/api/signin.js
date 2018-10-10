const express = require("express");
const router = express.Router();

const User = require("../../models/User.js");
const UserSession = require("../../models/UserSession.js");

router.post("/signup", (req, res) => {
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
      const newUser = new User();
      newUser.email = email;
      newUser.nome = nome;
      newUser.senha = newUser.generateHash(senha);
      newUser.save().then(item => res.json(item));
    }
  );
});

router.post("/signin", (req, res) => {
  const { body } = req;
  const { senha } = body;
  let { email } = body;

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

  User.find({ email: email }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: "Erro no Servidor"
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: "Email inválido"
      });
    }
    const user = users[0];

    if (!user.validPassword(senha)) {
      return res.send({
        success: false,
        message: "Senha inválida"
      });
    }

    //caso email e senha válidos
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: "Erro no Servidor"
        });
      }

      return res.send({
        success: true,
        message: "Login efetuado",
        token: doc._id
      });
    });
  });
});

//antes de fazer login, é necessário a verificação
router.get("/verify", (req, res) => {
  const { query } = req;
  const { token } = query;

  UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Erro no servidor"
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Sessão Inválida"
        });
      }

      return res.send({
        success: true,
        message: "Sessão OK"
      });
    }
  );
});

router.get("/logout", (req, res) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    { $set: { isDeleted: true } },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Erro no servidor"
        });
      }

      return res.send({
        success: true,
        message: "Sucesso no Logout"
      });
    }
  );
});

module.exports = router;
