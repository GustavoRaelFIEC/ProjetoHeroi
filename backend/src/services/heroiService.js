const guildaModel = require("../models/guildaModel");
const heroiModel = require("../models/heroiModel");
const missaoModel = require("../models/missaoModel");
const usuarioModel = require("../models/usuarioModel");
const db = require("../config/db");
const appError = require("../utils/appError");

const listarHerois = async (usuarioId) => {
  return heroiModel.listarHeroisPorUsuario(usuarioId);
};

const obterHeroi = async (id, usuarioId) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(id, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  const missoes = await missaoModel.listarMissoesPorHeroi(id);

  return {
    ...heroi,
    missoes,
  };
};

const criarHeroi = async (usuarioId, dados) => {
  const guilda = await guildaModel.buscarGuildaPorId(dados.guilda_id);

  if (!guilda) {
    throw appError("Guilda nao encontrada.", 404);
  }

  return heroiModel.criarHeroi({
    ...dados,
    usuario_id: usuarioId,
  });
};

const atualizarHeroi = async (id, usuarioId, dados) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(id, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  return heroiModel.atualizarHeroi(id, usuarioId, dados);
};

const removerHeroi = async (id, usuarioId) => {
  const removido = await heroiModel.removerHeroi(id, usuarioId);

  if (!removido) {
    throw appError("Heroi nao encontrado.", 404);
  }
};

const uparNivelHeroi = async (id, usuarioId) => {
  const heroi = await heroiModel.buscarHeroiPorIdEUsuario(id, usuarioId);

  if (!heroi) {
    throw appError("Heroi nao encontrado.", 404);
  }

  if (heroi.nivel_poder >= 100) {
    throw appError("Herói ja atingiu o nivel maximo.", 400);
  }

  const custo = (heroi.nivel_poder + 1) * 10;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const debited = await usuarioModel.debitarCoins(usuarioId, custo, connection);
    if (!debited) {
      throw appError("Saldo insuficiente para upar o heroi.", 400);
    }

    const heroiAtualizado = await heroiModel.subirNivelHeroi(id, connection);
    await connection.commit();

    return heroiAtualizado;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const obterMetricas = async (usuarioId) => {
  return heroiModel.obterMetricasHerois(usuarioId);
};

module.exports = {
  atualizarHeroi,
  criarHeroi,
  listarHerois,
  obterHeroi,
  uparNivelHeroi,
  obterMetricas,
  removerHeroi,
};
