const ClothingItems = require("../models/clothingItems");

const deleteItem = (req, res) => {
  ClothingItems.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((item) => {
      console.log("Item deleted!");
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "error: item not found." });
      } else if (err.name === "CastError") {
        return res.status(401).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .orFail()
    .then((items) => {
      console.log("Items returned!");
      res.send({ data: items });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "error: item not found." });
      } else if (err.name === "CastError") {
        return res.status(401).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, likes, createdAt } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner, likes, createdAt })
    //.orFail()
    .then((item) => {
      console.log("Item created!");
      res.status(201).send(item);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        return res.status(401).send({ message: "error" });
      } else if (err.name === "ValidationError") {
        return res.status(500).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
    });
};

module.exports = { getItems, createItem, deleteItem };
