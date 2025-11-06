const router = require("express").Router();

const AuthorizationController = require("../controllers/AuthorizationController");

const SchemaValidationMiddleware = require("../middlewares/SchemaValidationMiddleware");

const registerPayload = require("../../../application/dto/RegisterPayload");
const loginPayload = require("../../../application/dto/LoginPayload");

router.post(
  "/signup",
  [SchemaValidationMiddleware.verify(registerPayload)],
  AuthorizationController.register
);

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthorizationController.login
);

module.exports = router;