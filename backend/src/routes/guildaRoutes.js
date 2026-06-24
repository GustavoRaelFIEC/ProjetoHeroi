const express = require("express");
const guildaController = require("../controllers/guildaController");

const router = express.Router();

router.get("/", guildaController.listarGuildas);

module.exports = router;
