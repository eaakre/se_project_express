const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

// router.use(handleAuthorization);
router.post("/", createItem);

// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
