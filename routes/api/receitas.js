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

router.put("/putLike", (req, res) => {
  Receita.updateOne(
    { _id: req.query.id },
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

module.exports = router;
