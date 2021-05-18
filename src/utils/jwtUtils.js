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
  verifyToken: (token) => {
    // Throws error if token is invalid
    jwt.verify(token, jwtConfig.acessTokenSecret);
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
};
