let router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  resetPassword,
} = require("../db/authQueries");
const {
  generateAccessToken,
  generateTokens,
  decodeToken,
  extractToken,
} = require("../utils/jwtUtils");
const { hashPassword } = require("../utils/hash");

/**
 * Register new customer
 */
router.post("/register", (req, res) => {
  registerCustomer(req.body)
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
        error: err,
      })
    );
});

/**
 * Log in customer
 */
router.post("/login", (req, res) => {
  loginCustomer(req.body)
    .then((result) => {
      if (result.success) {
        let jwt = generateTokens(result.data);
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
router.get("/token", (req, res) => {
  const refreshToken = extractToken(req);
  if (!refreshToken) return res.sendStatus(401);

  try {
    let newToken = generateAccessToken(refreshToken);
    return res.status(200).json(newToken);
  } catch (err) {
    return res.status(403).send(err);
  }
});

/**
 * Reset user password
 */
router.post("/reset", async (req, res) => {
  const token = extractToken(req);
  if (!token) return res.status(401);

  try {
    const { id } = await decodeToken(token);
    const password = req.body.password;

    const hash = await hashPassword(password);
    const resetResult = await resetPassword(id, hash);

    return res.sendStatus(resetResult.id === id ? 200 : 400);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
