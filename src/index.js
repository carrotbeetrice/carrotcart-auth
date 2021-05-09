const express = require("express");
const cors = require("cors");
const config = require("./config/config");

const startServer = () => {
  const app = express();

  // Middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.get(config.api.prefix, (req, res) => {
    res.status(200).send({
      obi_wan: "Hello there",
      grievous: "GENERAL KENOBI",
    });
  });

  app.listen(config.port, () =>
    console.log(`Running CarrotCart API on port ${config.port}`)
  );
};

startServer();
