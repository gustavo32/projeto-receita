const express = require("express");
const router = express.Router();

const Receita = require("../../models/Receitas");


router.get("/primaryContent", (req, res) => {
  Receita.find().limit(4).then(receitas => res.json(receitas));
});

router.get("/otherContent", (req, res) => {
  Receita.find().limit(8).skip(8).then(receitas => res.json(receitas));
});

router.put("/like", (req, res) => {

  Receita.findById(req.params.id, function (err, receita) {
    if (err)
      res.send(err);

    receita.likes_total = req.body.likes_total;
    /*
     receita.save().then(item => res.json(item));*/
  });
});

/*
router.post("/", (req, res) => {
  const newReceita = new Receita({
    titulo: req.body.titulo,
    categoria: req.body.categoria
  });

  newReceita.save().then(item => res.json(item));
});
*/
module.exports = router;