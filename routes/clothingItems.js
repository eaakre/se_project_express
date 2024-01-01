const router = require("express").Router();

const {
  createItem,
  getItems,
  // updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

// router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
