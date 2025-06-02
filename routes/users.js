const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const { verifyAuthorization } = require("../middlewares/auth");

router.get("/me", verifyAuthorization, getCurrentUser);

router.patch("/me", verifyAuthorization, updateProfile);

module.exports = router;
