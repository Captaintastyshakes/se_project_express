const ClothingItems = require("../models/clothingItems");

const error = require("../errors/errors");

const cError = require("../errors/cErrors");

const { ForbiddenError, GenericError } = cError;

const deleteItem = (req, res, next) => {
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
          next(new GenericError(thisErr.code, thisErr.message));
        });
    })
    .catch((err) => {
      if (cError[err.name]) {
        next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        next(new Error(thisErr.message));
      }
      if (err.message.includes("DI1")) {
        thisErr = error.OwnerMismatchError;
        next(new ForbiddenError(thisErr.message));
      }
      thisErr = error[err.name];
      next(new GenericError(thisErr.code, thisErr.message));
    });
};

const getItems = (req, res, next) => {
  let thisErr;
  ClothingItems.find({})
    .then((items) => {
      console.log("Items returned!");
      res.send({ data: items });
    })
    .catch((err) => {
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const createItem = (req, res, next) => {
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
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const addLike = (req, res, next) => {
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
      res.send(item);
    })
    .catch((err) => {
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const removeLike = (req, res, next) => {
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
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

module.exports = { getItems, createItem, deleteItem, addLike, removeLike };
