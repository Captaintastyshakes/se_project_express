const router = require("express").Router({ mergeParams: true }); // thank you codeemzy!

const { addLike, removeLike } = require("../controllers/likes");

router.put("/", addLike);

router.delete("/", removeLike);

module.exports = router;
