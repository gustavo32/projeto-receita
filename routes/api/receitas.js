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
            $setDifference: ["$ingredientes.sub_lista", listaIngredientes]
          }
        },
        3
      ]
    }
  })
    // .limit(4)
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
                $setDifference: ["$ingredientes.sub_lista", listaIngredientes]
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
var listaIngredientes = [
  "farinha de trigo",
  "manteiga",
  "cebola",
  "alho",
  "leite",
  "sal",
  "pimenta-do-reino",
  "noz-moscada",
  "ovo",
  "500 ml de creme de leite fresco ou 400 gr de Nata",
  "1 unidade de cebola picada(s)",
  "1 folha de louro",
  "alecrim a gosto",
  "cebolinha verde a gosto",
  "pimenta-do-reino branca a gosto",
  "alho picado(s) a gosto",
  "salsinha picada(s) a gosto",
  "1 colher (sopa) de amido de milho",
  "sal a gosto",
  "500 gr de camarão sete barbas",
  "1 colher (sopa) de farinha de trigo",
  "1 colher (sopa) de manteiga",
  "1 dose de conhaque",
  "500 ml de água",
  "salsão a gosto",
  "pimenta-do-reino branca a gosto",
  "louro a gosto",
  "1 unidade de alho picado(s)",
  "salsinha picada(s) a gosto",
  "4 postas de salmão",
  "aspargo a gosto",
  "lagostim a gosto",
  "manteiga a gosto",
  "geral",
  "Molho",
  "Montagem"
];

module.exports = router;
