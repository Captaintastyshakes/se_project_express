const ClothingItems = require("../models/clothingItems");

const error = require("../utils/errors");

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  let thisErr;
  ClothingItems.findById({ _id: itemId })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return Promise.reject(
          new Error("Int subcode DI1: Owner and requester mistmatch.")
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
          thisErr = error.DeleteError;
          const { code, message } = thisErr;
          const outMessage = `Int code DI2: ${message}`;
          return res.status(code).send({ message: outMessage });
        });
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code DI3: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      if (err.message.includes("DI1")) {
        thisErr = error.OwnerMismatchError;
        const { code, message } = thisErr;
        const outMessage = `Int code DI4: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code DI5: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const getItems = (req, res) => {
  let thisErr;
  ClothingItems.find({})
    .then((items) => {
      console.log("Items returned!");
      res.send({ data: items });
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code GI1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code GI2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const createItem = (req, res) => {
  console.log("Engaging item creation...");
  let thisErr;
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log("Item created!");
      res.status(201).send(item);
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code CI1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code CI2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const addLike = (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.user;
  let thisErr;
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: _id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      console.log(`Item was updated and like was applied!`);
      //console.log(item);
      res.send(item);
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code AL1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code AL2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const removeLike = (req, res) => {
  const { _id } = req.user;
  const { itemId } = req.params;
  let thisErr;
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: _id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      console.log(`Item was updated and like was removed!`);
      return res.send(item);
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code RL1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code RL2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

module.exports = { getItems, createItem, deleteItem, addLike, removeLike };
