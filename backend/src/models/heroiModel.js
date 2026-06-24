const db = require("../config/db");

const heroiComRelacionamentosSelect = `
  SELECT
    h.id,
    h.nome,
    h.classe,
    h.nivel_poder,
    h.avatar_url,
    h.usuario_id,
    h.guilda_id,
    h.created_at,
    h.updated_at,
    g.nome AS guilda_nome,
    u.nome AS usuario_nome,
    u.email AS usuario_email
  FROM herois h
  INNER JOIN guildas g ON g.id = h.guilda_id
  INNER JOIN usuarios u ON u.id = h.usuario_id
`;

const listarHeroisPorUsuario = async (usuarioId) => {
  const [rows] = await db.execute(
    `${heroiComRelacionamentosSelect}
     WHERE h.usuario_id = ?
     ORDER BY h.created_at DESC`,
    [usuarioId]
  );

  return rows;
};

const buscarHeroiPorIdEUsuario = async (id, usuarioId) => {
  const [rows] = await db.execute(
    `${heroiComRelacionamentosSelect}
     WHERE h.id = ? AND h.usuario_id = ?
     LIMIT 1`,
    [id, usuarioId]
  );

  return rows[0] || null;
};

const criarHeroi = async ({ nome, classe, nivel_poder, avatar_url, usuario_id, guilda_id }) => {
  const [result] = await db.execute(
    `INSERT INTO herois (nome, classe, nivel_poder, avatar_url, usuario_id, guilda_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, classe, nivel_poder, avatar_url, usuario_id, guilda_id]
  );

  return buscarHeroiPorIdEUsuario(result.insertId, usuario_id);
};

const atualizarHeroi = async (id, usuarioId, { nome, classe, nivel_poder }) => {
  await db.execute(
    `UPDATE herois
     SET nome = ?, classe = ?, nivel_poder = ?
     WHERE id = ? AND usuario_id = ?`,
    [nome, classe, nivel_poder, id, usuarioId]
  );

  return buscarHeroiPorIdEUsuario(id, usuarioId);
};

const subirNivelHeroi = async (id, executor = db) => {
  await executor.execute(
    `UPDATE herois
     SET nivel_poder = nivel_poder + 1, updated_at = NOW()
     WHERE id = ?`,
    [id]
  );

  const [rows] = await executor.execute(
    `${heroiComRelacionamentosSelect}
     WHERE h.id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0];
};

const removerHeroi = async (id, usuarioId) => {
  const [result] = await db.execute("DELETE FROM herois WHERE id = ? AND usuario_id = ?", [
    id,
    usuarioId,
  ]);

  return result.affectedRows > 0;
};

const obterMetricasHerois = async (usuarioId) => {
  const [metricasRows] = await db.execute(
    `SELECT
       COUNT(*) AS total_herois,
       COALESCE(AVG(nivel_poder), 0) AS media_poder
     FROM herois
     WHERE usuario_id = ?`,
    [usuarioId]
  );

  const [guildaRows] = await db.execute(
    `SELECT
       g.nome AS guilda_nome,
       SUM(h.nivel_poder) AS poder_total
     FROM herois h
     INNER JOIN guildas g ON g.id = h.guilda_id
     WHERE h.usuario_id = ?
     GROUP BY g.id, g.nome
     ORDER BY poder_total DESC, g.nome ASC
     LIMIT 1`,
    [usuarioId]
  );

  return {
    total_herois: Number(metricasRows[0]?.total_herois || 0),
    media_poder: Number(metricasRows[0]?.media_poder || 0),
    guilda_mais_forte: guildaRows[0]?.guilda_nome || null,
  };
};

module.exports = {
  atualizarHeroi,
  buscarHeroiPorIdEUsuario,
  criarHeroi,
  listarHeroisPorUsuario,
  subirNivelHeroi,
  obterMetricasHerois,
  removerHeroi,
};