const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", handleAuthorization, createItem);

router.put("/:itemId/likes", handleAuthorization, likeItem);

router.delete("/:itemId", handleAuthorization, deleteItem);

router.delete("/:itemId/likes", handleAuthorization, unlikeItem);

module.exports = router;
