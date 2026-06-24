const heroiService = require("../services/heroiService");
const asyncHandler = require("../utils/asyncHandler");
const parseId = require("../utils/parseId");

const listarHerois = asyncHandler(async (req, res) => {
  const herois = await heroiService.listarHerois(req.usuario.id);
  res.json(herois);
});

const obterHeroi = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id, "Heroi");
  const heroi = await heroiService.obterHeroi(id, req.usuario.id);
  res.json(heroi);
});

const criarHeroi = asyncHandler(async (req, res) => {
  const heroi = await heroiService.criarHeroi(req.usuario.id, req.validated.body);
  res.status(201).json(heroi);
});

const atualizarHeroi = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id, "Heroi");
  const heroi = await heroiService.atualizarHeroi(id, req.usuario.id, req.validated.body);
  res.json(heroi);
});

const uparNivelHeroi = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id, "Heroi");
  const heroi = await heroiService.uparNivelHeroi(id, req.usuario.id);
  res.json(heroi);
});

const removerHeroi = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id, "Heroi");
  await heroiService.removerHeroi(id, req.usuario.id);
  res.status(204).send();
});

module.exports = {
  atualizarHeroi,
  criarHeroi,
  listarHerois,
  obterHeroi,
  uparNivelHeroi,
  removerHeroi,
};
