const router = require("express").Router();

// Controller Imports
const ProductController = require("../controllers/ProductController");

// Middleware Imports
const isAuthenticatedMiddleware = require("../middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createProductPayload = require("../../../application/dto/CreateProductPayload");
const updateProductPayload = require("../../../application/dto/UpdateProductPayload");
const { roles } = require("../../../shared/config/config");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  ProductController.getAllProducts
);

router.get(
  "/:productId",
  [isAuthenticatedMiddleware.check],
  ProductController.getProductById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(createProductPayload),
  ],
  ProductController.createProduct
);

router.patch(
  "/:productId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateProductPayload),
  ],
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ProductController.deleteProduct
);

module.exports = router;