const { verificarToken } = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token de autenticacao nao informado." });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    req.usuario = verificarToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token invalido ou expirado." });
  }
};

module.exports = authMiddleware;
