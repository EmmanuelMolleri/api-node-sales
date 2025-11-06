const router = require("express").Router();

const CartController = require("../controllers/CartController");

const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../middlewares/SchemaValidationMiddleware");

const addItemToCartPaylod = require("../../../application/dto/AddItemToCartPayload");

router.post(
    "/",
    [SchemaValidationMiddleware.verify(addItemToCartPaylod)],
    [isAuthenticatedMiddleware.check],
    CartController.addProductToCart
);

router.get(
    "/:cartId",
    [isAuthenticatedMiddleware.check],
    CartController.getCartById
);

router.delete(
    "/:cartItemId",
    [isAuthenticatedMiddleware.check],
    CartController.removeCartItem
);

module.exports = router;