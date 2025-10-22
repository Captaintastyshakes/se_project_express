const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const error = require("../errors/errors");

const { signUp, login } = require("../controllers/users");

const { checkForExistingUser } = require("../middlewares/existingUser");

const {
  authValidator,
  userBodyValidator,
} = require("../middlewares/validation");

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.post("/signup", userBodyValidator, checkForExistingUser, signUp); // added a middleware to make sure existing emails are caught
// "but mike- shouldn't the schema enforce the unique property for emails?" Golly gee it should but it doesn't so this is a manual catch.

router.post("/signin", authValidator, login);

router.use((req, res) => {
  const { code, message } = error.DocumentNotFoundError;
  res.status(code).send({ message });
});

module.exports = router;
