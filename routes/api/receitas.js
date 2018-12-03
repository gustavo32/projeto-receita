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

router.get("/moreReceitas/:option/:counter", (req, res) => {
  let counter = parseInt(req.params.counter);
  Receita.find()
    .limit(16)
    .skip(counter)
    .then(receitas => res.json(receitas))
    .catch(err => console.log(err));
});

router.get("/otherContent", (req, res) => {
  Receita.find()
    .sort({ likes_total: -1 })
    .limit(8)
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

router.get("/pesquisarLista/:array/:counter", (req, res) => {
  let counter = req.params.counter;
  counter = parseInt(counter);
  let itens = req.params.array;
  let temperos = [
    "alho",
    "cebola",
    "cebolinha",
    "cebolinha verde",
    "colorau",
    "mostarda",
    "orégano",
    "oregano",
    "pimenta reino",
    "salsa",
    "salsinha",
    "água",
    "açucar",
    "acucar",
    "açúcar",
    "agua",
    "sal",
    "sal grosso"
  ];
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["./routes/api/dataCleaning.py", itens]);

  process.stdout.on("data", data => {
    data = data.toString("binary").split(",");
    data[data.length - 1] = data[data.length - 1].replace("\r\n", "");
    data = data.concat(temperos);
    Receita.find({
      $expr: {
        $eq: [
          {
            $size: {
              $setDifference: ["$ingredientes_limpos", data]
            }
          },
          0
        ]
      }
    })
      .sort({ quantidade_ingre: -1 })
      .limit(16)
      .skip(counter)
      .then(receitas => res.json(receitas))
      .catch(err => console.log(err));

    process.on("exit", code => {
      console.log("Process quit with code : " + code);
    });
  });
});

// router.get("/pesquisaDescritiva/:texto/:counter", (req, res) => {
//   let texto = req.params.texto;
//   let counter = parseInt(req.params.counter);
//   let busca = new RegExp(".*" + texto + ".*", "gi");
//   Receita.find({
//     $or: [{ titulo: busca }, { "ingredientes.sub_lista": { $in: [busca] } }]
//   })
//     .limit(16)
//     .skip(counter)
//     .then(receitas => res.json(receitas));
// });

router.get("/pesquisaDescritiva/:texto/:counter", (req, res) => {
  let texto = req.params.texto;
  let counter = parseInt(req.params.counter);
  var ing = texto.replace(",", " ").split(" ");
  let busca = new RegExp(".*" + texto + ".*", "gi");

  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["./routes/api/dataCleaning.py", ing]);

  pythonProcess.stdout.on("data", data => {
    ing = data
      .toString("binary")
      .replace("\r\n", "")
      .split(",");
    for (i = 0; i < ing.length; i++) {
      ing[i] = new RegExp(".*(\\s|^)" + ing[i] + "(\\s|$).*", "gi");
    }
    Receita.find({
      $or: [{ titulo: busca }, { titulo: { $all: ing } }]
    })
      .limit(16)
      .skip(counter)
      .then(receitas => res.json(receitas));
  });
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
