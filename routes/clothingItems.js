const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
  validateClothingId,
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

router.put("/:itemId/likes", handleAuthorization, validateClothingId, likeItem);

router.delete("/:itemId", handleAuthorization, validateClothingId, deleteItem);

router.delete(
  "/:itemId/likes",
  handleAuthorization,
  validateClothingId,
  unlikeItem,
);

module.exports = router;
