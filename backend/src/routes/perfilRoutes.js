const express = require("express");
const perfilController = require("../controllers/perfilController");
const validate = require("../middlewares/validateMiddleware");
const { perfilSchema } = require("../validations/perfilValidation");

const router = express.Router();

router.get("/", perfilController.obterPerfil);
router.put("/", validate(perfilSchema), perfilController.atualizarPerfil);

module.exports = router;
