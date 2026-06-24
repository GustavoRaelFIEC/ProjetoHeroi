const jwt = require("jsonwebtoken");

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET nao configurado.");
  }

  return process.env.JWT_SECRET;
};

const gerarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  gerarToken,
  verificarToken,
};
