const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

const cadastrar = asyncHandler(async (req, res) => {
  const resultado = await authService.cadastrar(req.validated.body);
  res.status(201).json(resultado);
});

const login = asyncHandler(async (req, res) => {
  const resultado = await authService.login(req.validated.body);
  res.json(resultado);
});

module.exports = {
  cadastrar,
  login,
};
