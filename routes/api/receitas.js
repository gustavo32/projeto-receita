const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

const Receita = require("../../models/Receitas");

router.get("/primaryContent", (req, res) => {
  Receita.find()
    .limit(4)
    .then(receitas => res.json(receitas));
});

router.get("/otherContent", (req, res) => {
  Receita.find()
    .limit(8)
    .skip(8)
    .then(receitas => res.json(receitas));
});

router.put("/putLike/:idReceita/:userToken", (req, res) => {
  Receita.update(
    { _id: req.params.idReceita },
    { $inc: { likes_total: 1 } },
    {},
    (err, numberAffected) => {
      if (!err) {
        Receita.find({ _id: req.query.id }, (err, field) => {
          if (!err) {
            return res.send({
              success: true,
              likes: field[0].likes_total
            });
          } else {
            return res.send({
              success: false
            });
          }
        });
      }
    }
  );
});

router.get("/ingredientes_user/:token", (req, res) => {
  UserSession.find(
    {
      _id: req.params.token
    },
    (err, ok) => {
      if (err) {
        return res.send({
          success: false,
          ingredientes: []
        });
      } else if (ok) {
        User.find(
          {
            _id: ok[0].userId
          },
          (err2, ingred) => {
            if (err2) {
              return res.send({
                success: false,
                ingredientes: []
              });
            } else if (ingred) {
              return res.send({
                success: true,
                ingredientes: ingred[0].ingredientes
              });
            }
          }
        );
      }
    }
  );
});

router.post("/salvar_ingredientes_vazio/:token", (req, res) => {
  let ing = [];
  //console.log(req.params.token);
  UserSession.find({ _id: req.params.token }, (err, ok) => {
    if (ok) {
      User.updateOne(
        { _id: ok[0].userId },
        { $set: { ingredientes: ing } },
        (err, ok) => {
          if (err) {
            return res.send({
              success: false
            });
          } else {
            return res.send({
              success: true
            });
          }
        }
      );
    }
  });
});

router.post("/salvar_ingredientes/:token/:ingredientes", (req, res) => {
  ing = req.params.ingredientes.split(",");
  //console.log(req.params.token);
  UserSession.find({ _id: req.params.token }, (err, ok) => {
    if (ok) {
      User.updateOne(
        { _id: ok[0].userId },
        { $set: { ingredientes: ing } },
        (err, ok) => {
          if (err) {
            return res.send({
              success: false
            });
          } else {
            return res.send({
              success: true
            });
          }
        }
      );
    }
  });
});

module.exports = router;
