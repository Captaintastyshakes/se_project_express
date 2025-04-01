const ClothingItems = require("../models/clothingItems");

const error = require("../utils/errors");

const deleteItem = (req, res) => {
  ClothingItems.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((item) => {
      console.log("Item deleted!");
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => {
      console.log("Items returned!");
      res.send({ data: items });
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log("Item created!");
      res.status(201).send(item);
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

module.exports = { getItems, createItem, deleteItem };
