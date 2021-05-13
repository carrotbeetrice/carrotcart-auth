let router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send({
        obi_wan: "Hello there",
        grievous: "GENERAL KENOBI",
      });
});

module.exports = router;