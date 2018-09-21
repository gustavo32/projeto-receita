const express = require("express");
const router = express.Router();

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

module.exports = router;
