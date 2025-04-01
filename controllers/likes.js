const ClothingItems = require("../models/clothingItems");

const error = require("../utils/errors");

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
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
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
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

module.exports = { addLike, removeLike };
