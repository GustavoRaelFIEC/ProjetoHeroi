const { z } = require("zod");

const classesValidas = ["Mago", "Guerreiro", "Arqueiro", "Ladino"];

const imagemUrlSchema = z
  .string()
  .trim()
  .url("Avatar deve ser uma URL valida.");

const heroiBodySchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter no minimo 3 caracteres."),
  classe: z.enum(classesValidas),
  nivel_poder: z.coerce
    .number()
    .int("Nivel de poder deve ser um numero inteiro.")
    .min(0, "Nivel de poder minimo e 0.")
    .max(100, "Nivel de poder maximo e 100."),
  avatar_url: imagemUrlSchema,
  guilda_id: z.coerce.number().int().positive("Guilda e obrigatoria."),
});

const criarHeroiSchema = z.object({
  body: heroiBodySchema,
});

const atualizarHeroiSchema = z.object({
  body: heroiBodySchema.pick({
    nome: true,
    classe: true,
    nivel_poder: true,
  }),
});

module.exports = {
  atualizarHeroiSchema,
  classesValidas,
  criarHeroiSchema,
};
