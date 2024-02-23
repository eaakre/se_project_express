const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { handleAuthorization } = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");

router.get("/me", handleAuthorization, getCurrentUser);
router.patch("/me", handleAuthorization, validateId, updateUser);

module.exports = router;
