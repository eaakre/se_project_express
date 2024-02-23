const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", handleAuthorization, validateClothingItem, createItem);

router.put("/:itemId/likes", handleAuthorization, validateId, likeItem);

router.delete("/:itemId", handleAuthorization, validateId, deleteItem);

router.delete("/:itemId/likes", handleAuthorization, validateId, unlikeItem);

module.exports = router;
