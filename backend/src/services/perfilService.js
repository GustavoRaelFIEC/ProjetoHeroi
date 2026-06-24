const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel");
const appError = require("../utils/appError");

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

const obterPerfil = async (usuarioId) => {
  const usuario = await usuarioModel.buscarUsuarioPorId(usuarioId);

  if (!usuario) {
    throw appError("Usuario nao encontrado.", 404);
  }

  return usuario;
};

const atualizarPerfil = async (usuarioId, dados) => {
  const usuarioAtual = await usuarioModel.buscarUsuarioComSenhaPorId(usuarioId);

  if (!usuarioAtual) {
    throw appError("Usuario nao encontrado.", 404);
  }

  if (dados.email && dados.email !== usuarioAtual.email) {
    const emailEmUso = await usuarioModel.buscarUsuarioPorEmail(dados.email);

    if (emailEmUso) {
      throw appError("Email ja cadastrado.", 409);
    }
  }

  if (dados.nova_senha) {
    const senhaAtualValida = await bcrypt.compare(dados.senha_atual, usuarioAtual.senha_hash);

    if (!senhaAtualValida) {
      throw appError("Senha atual incorreta.", 401);
    }

    const senha_hash = await bcrypt.hash(dados.nova_senha, saltRounds);
    await usuarioModel.atualizarSenha(usuarioId, senha_hash);
  }

  return usuarioModel.atualizarPerfil(usuarioId, {
    nome: dados.nome,
    email: dados.email,
  });
};

module.exports = {
  atualizarPerfil,
  obterPerfil,
};
