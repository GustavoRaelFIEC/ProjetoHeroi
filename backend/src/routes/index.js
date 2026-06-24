const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const guildaRoutes = require("./guildaRoutes");
const heroiRoutes = require("./heroiRoutes");
const perfilRoutes = require("./perfilRoutes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/perfil", perfilRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/guildas", guildaRoutes);
router.use("/herois", heroiRoutes);

module.exports = router;
