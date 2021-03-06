const dotenv = require("dotenv");

if (process.env.NODE_ENV === "dev") {
  const envFound = dotenv.config();
  if (envFound.error)
    throw new Error("Development mode: Could not find .env file");
}

module.exports = {
  /**
   * API port
   */
  port: process.env.PORT || 8080,
  /**
   * API configs
   */
  api: {
    prefix: "/auth",
  },
  /**
   * Database configs
   */
  db: {
    config: {
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.DB_PORT,
      idleTimeoutMillis: 30000,
    },
    uri: process.env.DATABASE_URL || null,
  },
  /**
   * JWT secret
   */
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    maxAccessTokenAge: "12h",
    maxRefreshTokenAge: "168h",
  },
};
