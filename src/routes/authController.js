let router = require("express").Router();
const authQueries = require("../db/authQueries");
const jwtUtils = require("../utils/jwtUtils");

/**
 * Register new customer
 */
router.post("/register", (req, res) => {
  authQueries
    .registerCustomer(req.body)
    .then((result) => {
      if (!result) {
        return res.status(400).send({
          error: "Account with this email already exists",
        });
      }
      return res.status(200).send(result);
    })
    .catch((err) =>
      res.status(500).send({
        error: "Error registering",
      })
    );
});

/**
 * Log in customer
 */
router.post("/login", (req, res) => {
  authQueries
    .loginCustomer(req.body)
    .then((result) => {
      if (result.success) {
        let jwt = jwtUtils.generateToken(result.data);
        result.jwt = jwt;
        return res.status(200).send(result);
      } else {
        return res.status(400).send(result);
      }
      
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        error: err,
      });
    });
});

module.exports = router;
