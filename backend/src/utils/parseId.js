const appError = require("./appError");

const parseId = (value, label = "id") => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw appError(`${label} invalido.`, 400);
  }

  return parsed;
};

module.exports = parseId;
