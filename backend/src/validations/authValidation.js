const { z } = require("zod");

const cadastroSchema = z.object({
  body: z.object({
    nome: z.string().trim().min(3, "Nome completo deve ter no minimo 3 caracteres."),
    email: z.string().trim().email("Email invalido."),
    senha: z.string().min(1, "Senha e obrigatoria."),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Email invalido."),
    senha: z.string().min(1, "Senha e obrigatoria."),
  }),
});

module.exports = {
  cadastroSchema,
  loginSchema,
};
