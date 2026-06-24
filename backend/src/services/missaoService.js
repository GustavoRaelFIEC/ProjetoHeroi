const db = require("../config/db");
const heroiModel = require("../models/heroiModel");
const missaoModel = require("../models/missaoModel");
const usuarioModel = require("../models/usuarioModel");
const appError = require("../utils/appError");

const criarMissao = async (heroiId, usuarioId, dados) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(heroiId, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  return missaoModel.criarMissao({
    ...dados,
    heroi_id: heroiId,
  });
};

const atualizarStatusMissao = async (heroiId, usuarioId, missaoId, status) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(heroiId, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const missao = await missaoModel.obterMissaoPorId(missaoId, connection);

    if (!missao || missao.heroi_id !== heroiId) {
      throw appError("Missao nao encontrada para este heroi.", 404);
    }

    if (status === "Concluída" && missao.status !== "Concluída") {
      await usuarioModel.creditarCoins(usuarioId, missao.recompensa_ouro, connection);
    }

    const missaoAtualizada = await missaoModel.atualizarStatusMissao(missaoId, status, connection);
    await connection.commit();

    return missaoAtualizada;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const removerMissao = async (heroiId, usuarioId, missaoId) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(heroiId, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  const missao = await missaoModel.obterMissaoPorId(missaoId);

  if (!missao || missao.heroi_id !== heroiId) {
    throw appError("Missao nao encontrada para este heroi.", 404);
  }

  const removed = await missaoModel.removerMissao(missaoId);

  if (!removed) {
    throw appError("Nao foi possivel remover a missao.", 500);
  }

  return true;
};

module.exports = {
  criarMissao,
  atualizarStatusMissao,
  removerMissao,
};
