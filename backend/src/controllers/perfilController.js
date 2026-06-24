const perfilService = require("../services/perfilService");
const asyncHandler = require("../utils/asyncHandler");

const obterPerfil = asyncHandler(async (req, res) => {
  const usuario = await perfilService.obterPerfil(req.usuario.id);
  res.json(usuario);
});

const atualizarPerfil = asyncHandler(async (req, res) => {
  const usuario = await perfilService.atualizarPerfil(req.usuario.id, req.validated.body);
  res.json(usuario);
});

module.exports = {
  atualizarPerfil,
  obterPerfil,
};

