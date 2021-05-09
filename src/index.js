const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv");

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

let port = process.env.PORT || 8080;

// Default API route
app.get("/", (req, res) => {
    res.status(200).send({
        obi_wan: "Hello there",
        grievous: "GENERAL KENOBI"
    });
});

// Launch app
app.listen(port, () => console.log("Running CarrotCart API on port " + port));