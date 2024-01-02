const router = require("express").Router();
const { NOTFOUND_ERROR } = require("../utils/errors");

const clothingItem = require("./clothingItems");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(NOTFOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
