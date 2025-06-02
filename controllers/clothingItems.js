const ClothingItems = require("../models/clothingItems");

const error = require("../utils/errors");

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItems.findById({ _id: itemId })
    //.orFail()
    .then((item) => {
      if (item.owner != req.user._id) {
        return Promise.reject(
          new Error("Owner and requester mistmatch. Internal code DI1")
        );
      }
      return item;
    })
    .then((item) => {
      ClothingItems.findByIdAndRemove({ _id: item._id })
        .then(() => {
          console.log("Item deleted!");
          return res.send({ data: item });
        })
        .catch(() => {
          return res
            .status(500)
            .send({ message: "Unable to delete, internal code DI2" });
        });
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code DI3" });
      } else if (err.message.includes("DI1")) {
        return res
          .status(403)
          .send({ message: "Owner and requester mismatch! Internal code DI4" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code DI5` });
    });
};

const getItems = (req, res) => {
  ClothingItems.find({})
    .then((items) => {
      console.log("Items returned!");
      res.send({ data: items });
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code GI1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code GI2` });
    });
};

const createItem = (req, res) => {
  console.log("Engaging item creation...");
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log("Item created!");
      res.status(201).send(item);
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code CI1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code CI2` });
    });
};

//integrating likes controllers here

const addLike = (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.user;
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: _id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      console.log(`Item was updated and like was applied!`);
      res.status(200).send(item);
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code AL1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code AL2` });
    });
};

const removeLike = (req, res) => {
  const { _id } = req.user;
  const { itemId } = req.params;
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: _id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      console.log(`Item was updated and like was removed!`);
      res.status(200).send(item);
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code RL1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code RL2` });
    });
};

//

//module.exports = { getItems, createItem, deleteItem };
module.exports = { getItems, createItem, deleteItem, addLike, removeLike };
