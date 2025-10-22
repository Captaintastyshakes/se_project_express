const router = require("express").Router();

const { verifyAuthorization } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

const {
  itemBodyValidator,
  contentIdValidator,
} = require("../middlewares/validation");

router.get("/", getItems);

router.use("/", verifyAuthorization);

router.post("/", itemBodyValidator, createItem);

router.delete("/:itemId", contentIdValidator, deleteItem);

router.put("/:itemId/likes", contentIdValidator, addLike);

router.delete("/:itemId/likes", contentIdValidator, removeLike);

module.exports = router;
