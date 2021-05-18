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
        let jwt = jwtUtils.generateTokens(result.data);
        return res.status(200).send({
          success: result.success,
          jwt: jwt,
        });
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

/**
 * Generate new access token from refresh token
 */
router.post("/token", (req, res) => {
  try {
    let newToken = jwtUtils.generateAccessToken(req.body.accessToken);
    return res.status(200).json(newToken);
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
