const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;

module.exports = {
  generateTokens: (payload) => {
    // Generate access and refresh tokens
    let accessToken = jwt.sign(payload, jwtConfig.accessTokenSecret, {
      expiresIn: jwtConfig.maxAccessTokenAge,
    });
    let refreshToken = jwt.sign(payload, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.maxRefreshTokenAge,
    });

    return { accessToken, refreshToken };
  },
  decodeToken: (token) => {
    return new Promise((resolve, reject) =>
      jwt.verify(token, jwtConfig.accessTokenSecret, (err, decoded) => {
        if (err) return reject(err);
        else return resolve(decoded);
      })
    );
  },
  generateAccessToken: (refreshToken) => {
    let user = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);
    let newAccessToken = jwt.sign(
      { id: user.id },
      jwtConfig.accessTokenSecret,
      {
        expiresIn: jwtConfig.maxAccessTokenAge,
      }
    );
    return newAccessToken;
  },
  extractToken: (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    } else return null;
  },
};
