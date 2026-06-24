const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const { cadastroSchema, loginSchema } = require("../validations/authValidation");

const router = express.Router();

router.post("/cadastro", validate(cadastroSchema), authController.cadastrar);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
