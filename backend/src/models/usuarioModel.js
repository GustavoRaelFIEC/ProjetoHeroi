const db = require("../config/db");

const criarUsuario = async ({ nome, email, senha_hash }) => {
  const [result] = await db.execute(
    "INSERT INTO usuarios (nome, email, senha_hash, coins) VALUES (?, ?, ?, 100)",
    [nome, email, senha_hash]
  );

  return buscarUsuarioPorId(result.insertId);
};

const buscarUsuarioPorEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT id, nome, email, senha_hash, coins, created_at, updated_at FROM usuarios WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] || null;
};

const buscarUsuarioPorId = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, nome, email, coins, created_at, updated_at FROM usuarios WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};

const buscarUsuarioComSenhaPorId = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, nome, email, senha_hash, coins, created_at, updated_at FROM usuarios WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] || null;
};

const atualizarPerfil = async (id, { nome, email }) => {
  await db.execute(
    "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
    [nome || null, email || null, id]
  );

  return buscarUsuarioPorId(id);
};

const debitarCoins = async (id, valor, executor = db) => {
  console.log(`usuarioModel.debitarCoins called: id=${id} valor=${valor}`);
  const [result] = await executor.execute(
    "UPDATE usuarios SET coins = coins - ? WHERE id = ? AND coins >= ?",
    [valor, id, valor]
  );

  return result.affectedRows > 0;
};

const atualizarCoins = async (id, coins, executor = db) => {
  await executor.execute("UPDATE usuarios SET coins = ? WHERE id = ?", [coins, id]);
  return buscarUsuarioPorId(id);
};

const creditarCoins = async (id, valor, executor = db) => {
  console.log(`usuarioModel.creditarCoins called: id=${id} valor=${valor}`);
  const [result] = await executor.execute(
    "UPDATE usuarios SET coins = coins + ? WHERE id = ?",
    [valor, id]
  );

  return result.affectedRows > 0;
};

const atualizarSenha = async (id, senha_hash) => {
  await db.execute("UPDATE usuarios SET senha_hash = ? WHERE id = ?", [senha_hash, id]);
};

module.exports = {
  atualizarPerfil,
  atualizarSenha,
  buscarUsuarioComSenhaPorId,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario,
  debitarCoins,
  creditarCoins,
  atualizarCoins,
};
