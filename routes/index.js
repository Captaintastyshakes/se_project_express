const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const error = require("../utils/errors");

const { signUp, login } = require("../controllers/users");

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.post("/signup", signUp);

router.post("/signin", login);

router.use((req, res) => {
  const { code, message } = error.DocumentNotFoundError;
  res.status(code).send({ message });
});

module.exports = router;
