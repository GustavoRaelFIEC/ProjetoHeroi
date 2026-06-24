const guildaModel = require("../models/guildaModel");

const listarGuildas = async () => {
  return guildaModel.listarGuildas();
};

module.exports = {
  listarGuildas,
};
