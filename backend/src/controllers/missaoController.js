const missaoService = require("../services/missaoService");
const asyncHandler = require("../utils/asyncHandler");
const parseId = require("../utils/parseId");

const criarMissao = asyncHandler(async (req, res) => {
  const heroiId = parseId(req.params.heroiId, "Heroi");
  const missao = await missaoService.criarMissao(heroiId, req.usuario.id, req.validated.body);
  res.status(201).json(missao);
});

const atualizarStatusMissao = asyncHandler(async (req, res) => {
  const heroiId = parseId(req.params.heroiId, "Heroi");
  const missaoId = parseId(req.params.missaoId, "Missao");
  const missao = await missaoService.atualizarStatusMissao(
    heroiId,
    req.usuario.id,
    missaoId,
    req.validated.body.status
  );

  res.json(missao);
});

const removerMissao = asyncHandler(async (req, res) => {
  const heroiId = parseId(req.params.heroiId, "Heroi");
  const missaoId = parseId(req.params.missaoId, "Missao");
  await missaoService.removerMissao(heroiId, req.usuario.id, missaoId);
  res.status(204).send();
});

module.exports = {
  criarMissao,
  atualizarStatusMissao,
  removerMissao,
};
