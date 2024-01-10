const router = require("express").Router();
const auth = require("./middlewares/auth");

const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);
router.post("/", createItem);

// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
