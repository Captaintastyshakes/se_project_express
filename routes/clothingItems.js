const router = require("express").Router();

const { addLike, removeLike } = require("../controllers/likes");

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", addLike);

router.delete("/:itemId/likes", removeLike);

module.exports = router;
