const ClothingItems = require("../models/clothingItems");

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
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "error: item not found. Unable to apply like." });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
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
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "error: item not found." });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
    });
};

module.exports = { addLike, removeLike };
