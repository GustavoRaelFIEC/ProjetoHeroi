const guildaService = require("../services/guildaService");
const asyncHandler = require("../utils/asyncHandler");

const listarGuildas = asyncHandler(async (req, res) => {
  const guildas = await guildaService.listarGuildas();
  res.json(guildas);
});

module.exports = {
  listarGuildas,
};
