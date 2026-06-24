require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const { errorMiddleware, notFoundMiddleware } = require("./src/middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "portal-de-herois" });
});

app.use("/api", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Portal de Herois API rodando na porta ${port}`);
});
