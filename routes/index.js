const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

//const likeRouter = require("./likes");

router.use("/users", userRouter);

router.use("/items", clothingRouter); //also contains my likes router

module.exports = router;
