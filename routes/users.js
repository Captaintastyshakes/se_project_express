const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const { verifyAuthorization } = require("../middlewares/auth");

const { updateUserBodyValidator } = require("../middlewares/validation");

router.get("/me", verifyAuthorization, getCurrentUser);

router.patch(
  "/me",
  verifyAuthorization,
  updateUserBodyValidator,
  updateProfile
);

module.exports = router;
