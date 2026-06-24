const notFoundMiddleware = (req, res) => {
  res.status(404).json({ erro: "Rota nao encontrada." });
};

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    erro: error.message || "Erro interno do servidor.",
  });
};

module.exports = {
  errorMiddleware,
  notFoundMiddleware,
};
