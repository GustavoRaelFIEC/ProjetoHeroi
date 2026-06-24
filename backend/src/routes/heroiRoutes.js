const express = require("express");
const heroiController = require("../controllers/heroiController");
const missaoController = require("../controllers/missaoController");
const validate = require("../middlewares/validateMiddleware");
const { atualizarHeroiSchema, criarHeroiSchema } = require("../validations/heroiValidation");
const { criarMissaoSchema, atualizarMissaoSchema } = require("../validations/missaoValidation");

const router = express.Router();

router.get("/", heroiController.listarHerois);
router.post("/", validate(criarHeroiSchema), heroiController.criarHeroi);
router.post("/:heroiId/missoes", validate(criarMissaoSchema), missaoController.criarMissao);
router.put(
  "/:heroiId/missoes/:missaoId/status",
  validate(atualizarMissaoSchema),
  missaoController.atualizarStatusMissao
);
router.delete("/:heroiId/missoes/:missaoId", missaoController.removerMissao);
router.get("/:id", heroiController.obterHeroi);
router.put('/:id', validate(atualizarHeroiSchema), heroiController.atualizarHeroi);
router.post('/:id/level-up', heroiController.uparNivelHeroi);
router.delete('/:id', heroiController.removerHeroi);

module.exports = router;
