const db = require("../config/db");

const listarGuildas = async () => {
  const [rows] = await db.execute(
    "SELECT id, nome, created_at, updated_at FROM guildas ORDER BY nome ASC"
  );

  return rows;
};

const buscarGuildaPorId = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, nome, created_at, updated_at FROM guildas WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};

module.exports = {
  buscarGuildaPorId,
  listarGuildas,
};
