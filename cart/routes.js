const router = require("express").Router();

const CartController = require("./controllers/CartController");

const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

const addItemToCartPaylod = require("./schemas/addItemToCartPayload");

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