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

router.get("/getLike/:userToken", (req, res) => {
  UserSession.find(
    {
      _id: req.params.userToken
    },
    (err, ok) => {
      if (err) {
        return res.send({
          success: false,
          likes: []
        });
      }
      if (ok) {
        User.find({ _id: ok[0].userId }, (err2, ok2) => {
          if (ok2) {
            return res.send({
              success: true,
              likes: ok2[0].likes
            });
          }
        });
      }
    }
  );
});

router.post("/putLike/:idReceita/:userToken", (req, res) => {
  Receita.updateOne(
    { _id: req.params.idReceita },
    { $inc: { likes_total: 1 } },
    (err, element) => {
      if (!err) {
        UserSession.findById(req.params.userToken, (err, ok) => {
          if (err) {
            return res.send({
              success: false
            });
          }
          if (ok) {
            User.updateOne(
              { _id: ok.userId },
              { $push: { likes: { id: req.params.idReceita, liked: true } } },
              (err2, ok2) => {
                if (ok2) {
                  return res.send({
                    success: true,
                    likes: ok2.likes
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

router.post("/postDislike/:idReceita/:userToken", (req, res) => {
  UserSession.findById(req.params.userToken, (err, ok) => {
    if (ok) {
      User.updateOne(
        { _id: ok.userId },
        { $pull: { likes: { id: req.params.idReceita } } },
        (err, acc) => {
          if (acc) {
            Receita.updateOne(
              {
                _id: req.params.idReceita
              },
              { $inc: { likes_total: -1 } },
              (err2, ok2) => {
                if (ok2) {
                  return res.send({
                    success: true
                  });
                }
              }
            );
          }
        }
      );
    }
  });
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
