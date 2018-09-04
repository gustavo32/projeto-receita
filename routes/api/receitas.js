const express = require("express");
const router = express.Router();

//Item Model
const Receita = require("../../models/Receitas");

// @route  GET api/receitas
// @desc   Get all Items
// @access Public
router.get("/", (req, res) => {
  Receita.find({}, { _id: 0, titulo: 1 }).then(receitas => res.json(receitas));
});

// @route  POST api/items
// @desc   Post an Items
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

module.exports = router;
