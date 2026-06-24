const { z } = require("zod");

const perfilSchema = z.object({
  body: z
    .object({
      nome: z.string().trim().min(3, "Nome deve ter no minimo 3 caracteres.").optional(),
      email: z.string().trim().email("Email invalido.").optional(),
      senha_atual: z.string().min(1, "Senha atual e obrigatoria.").optional(),
      nova_senha: z.string().min(1, "Nova senha e obrigatoria.").optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (!data.nome && !data.email && !data.nova_senha) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["nome"],
          message: "Informe ao menos um campo para atualizar.",
        });
      }

      if (data.nova_senha && !data.senha_atual) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["senha_atual"],
          message: "Senha atual e obrigatoria para alterar a senha.",
        });
      }
    }),
});

module.exports = {
  perfilSchema,
};
