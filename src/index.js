const express = require("express");
const cors = require("cors");
const config = require("./config/config");

const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // Use API routes
  require("./routes/index")(app, config.api.prefix);

  app.listen(config.port, () =>
    console.log(`Running CarrotCart API on port ${config.port}`)
  );
};

startServer();
