const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Items");

// @route  GET api/items
// @desc   Get all Items
// @access Public
router.get("/", (req, res) => {
  Item.find().limit(4)
    .then(items => res.json(items));
});

/*
// @route  POST api/items
// @desc   Post an Items
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});
*/
module.exports = router;