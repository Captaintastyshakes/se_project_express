const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const error = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.use((req, res) => {
  const { code, message } = error.DocumentNotFoundError;
  res.status(code).send({ message });
});

module.exports = router;
