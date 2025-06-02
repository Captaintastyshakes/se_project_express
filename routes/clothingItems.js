const router = require("express").Router();

const { verifyAuthorization } = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use("/", verifyAuthorization);

router.post("/", createItem);

router.delete("/:itemId", deleteItem);

router.put("/:itemId/likes", addLike);

router.delete("/:itemId/likes", removeLike);

module.exports = router;
