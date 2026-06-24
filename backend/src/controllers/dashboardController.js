const heroiService = require("../services/heroiService");
const asyncHandler = require("../utils/asyncHandler");

const obterMetricas = asyncHandler(async (req, res) => {
  const metricas = await heroiService.obterMetricas(req.usuario.id);
  res.json(metricas);
});

module.exports = {
  obterMetricas,
};
