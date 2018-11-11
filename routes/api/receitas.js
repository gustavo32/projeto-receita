const express = require("express");
const router = express.Router();

const Receita = require("../../models/Receitas");

// router.get("/primaryContent", (req, res) => {
//   Receita.find()
//     .limit(4)
//     .then(receitas => res.json(receitas));
// });
router.get("/primaryContent", (req, res) => {
  var listIng = [];
  for (i = 0; i < listaIngredientes.length; i++) {
    listIng[i] = new RegExp(".?" + listaIngredientes[i] + ".?");
  }
  Receita.find({
    $expr: {
      $eq: [
        {
          $size: {
            $setDifference: ["$ingredientes_limpos", listaIngredientes]
          }
        },
        0
      ]
    }
  })
    .limit(4)
    .then(receitas => res.json(receitas));
});
/////////////////////////////////////////////////["1 colher (sopa) de farinha de trigo","1 colher (sopa) de manteiga","1 unidade de cebola picada(s)","1 dente de alho esmagado(s)","leite a gosto","sal a gosto","pimenta-do-reino branca a gosto","noz-moscada a gosto"]
router.get("/test", (req, res) => {
  var listIng = [];
  for (i = 0; i < listaIngredientes.length; i++) {
    listIng[i] = new RegExp(".?" + listaIngredientes[i] + ".?");
  }
  Receita.aggregate([
    {
      $cond: {
        if: { $lte: ["$quantidade_ingre", 5] },
        then: {
          $project: {
            titulo: 1,
            Tamanho: {
              $size: {
                $setDifference: ["$ingredientes_limpos", listaIngredientes]
              }
            }
          }
        }
      }
    }
  ]);
});
//////////////////////////////////////////////////

router.get("/otherContent", (req, res) => {
  Receita.find()
    .sort({ likes_total: -1 })
    .limit(8)
    .then(receitas => res.json(receitas));
});

router.put("/:id", (req, res) => {
  Receita.updateOne(
    { _id: req.params.id },
    { $inc: { likes_total: 1 } },
    {},
    (err, numberAffected) => {
      res.send("sucesso");
    }
  );
});
var listaIngredientes = ["alecrim", "alho", "azeite"];

module.exports = router;
