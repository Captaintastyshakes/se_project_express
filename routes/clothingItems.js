const router = require("express").Router();

const likeRouter = require("./likes");

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

router.use("/:itemId/likes", likeRouter);

module.exports = router;
