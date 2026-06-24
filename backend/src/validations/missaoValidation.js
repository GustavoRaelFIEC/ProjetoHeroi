const { z } = require("zod");

const statusValidos = ["Em andamento", "Concluída", "Falhou"];

const criarMissaoSchema = z.object({
  body: z.object({
    descricao: z.string().trim().min(3, "Descricao deve ter no minimo 3 caracteres."),
    status: z.enum(statusValidos),
    recompensa_ouro: z.coerce
      .number()
      .int("Recompensa deve ser um numero inteiro.")
      .min(0, "Recompensa em ouro nao pode ser negativa."),
  }),
});

const atualizarMissaoSchema = z.object({
  body: z.object({
    status: z.enum(statusValidos),
  }),
});

module.exports = {
  criarMissaoSchema,
  atualizarMissaoSchema,
  statusValidos,
};
