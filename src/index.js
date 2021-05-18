const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes/authController");

const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // Use API routes
  app.use("/auth", routes);

  app.listen(config.port, () =>
    console.log(`Running CarrotCart API on port ${config.port}`)
  );
};

startServer();
