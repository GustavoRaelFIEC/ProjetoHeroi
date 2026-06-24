const bcrypt = require("bcrypt");
const { gerarToken } = require("../config/jwt");
const usuarioModel = require("../models/usuarioModel");
const appError = require("../utils/appError");

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

const cadastrar = async ({ nome, email, senha }) => {
  const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw appError("Email ja cadastrado.");
  }

  const senha_hash = await bcrypt.hash(senha, saltRounds);
  const usuario = await usuarioModel.criarUsuario({ nome, email, senha_hash });
  const token = gerarToken(usuario);

  return { usuario, token };
};

const login = async ({ email, senha }) => {
  const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

  if (!usuario) {
    throw appError("Credenciais invalidas.");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaValida) {
    throw appError("Credenciais invalidas.");
  }

  const usuarioSeguro = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    coins: usuario.coins,
    created_at: usuario.created_at,
    updated_at: usuario.updated_at,
  };

  return {
    usuario: usuarioSeguro,
    token: gerarToken(usuarioSeguro),
  };
};

module.exports = {
  cadastrar,
  login,
};
