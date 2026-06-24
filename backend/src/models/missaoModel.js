const db = require("../config/db");

const listarMissoesPorHeroi = async (heroiId) => {
  const [rows] = await db.execute(
    `SELECT id, descricao, status, recompensa_ouro, heroi_id, created_at, updated_at
     FROM missoes
     WHERE heroi_id = ?
     ORDER BY created_at DESC`,
    [heroiId]
  );

  return rows;
};

const criarMissao = async ({ descricao, status, recompensa_ouro, heroi_id }) => {
  const [result] = await db.execute(
    `INSERT INTO missoes (descricao, status, recompensa_ouro, heroi_id)
     VALUES (?, ?, ?, ?)`,
    [descricao, status, recompensa_ouro, heroi_id]
  );

  const [rows] = await db.execute(
    `SELECT id, descricao, status, recompensa_ouro, heroi_id, created_at, updated_at
     FROM missoes
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0];
};

const obterMissaoPorId = async (missaoId, executor = db) => {
  const [rows] = await executor.execute(
    `SELECT id, descricao, status, recompensa_ouro, heroi_id, created_at, updated_at
     FROM missoes
     WHERE id = ?
     LIMIT 1`,
    [missaoId]
  );

  return rows[0];
};

const atualizarStatusMissao = async (missaoId, status, executor = db) => {
  await executor.execute(
    `UPDATE missoes
     SET status = ?, updated_at = NOW()
     WHERE id = ?`,
    [status, missaoId]
  );

  const [rows] = await executor.execute(
    `SELECT id, descricao, status, recompensa_ouro, heroi_id, created_at, updated_at
     FROM missoes
     WHERE id = ?
     LIMIT 1`,
    [missaoId]
  );

  return rows[0];
};

const removerMissao = async (missaoId, executor = db) => {
  const [result] = await executor.execute(
    `DELETE FROM missoes WHERE id = ?`,
    [missaoId]
  );

  return result.affectedRows > 0;
};

module.exports = {
  criarMissao,
  listarMissoesPorHeroi,
  obterMissaoPorId,
  atualizarStatusMissao,
  removerMissao,
};
