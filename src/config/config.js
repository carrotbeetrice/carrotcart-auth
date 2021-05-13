const dotenv = require("dotenv");

// Set NODE_ENV to development by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Check if .env file exists
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Could not find .env file.");
}

module.exports = {
  /**
   * API port
   */
  port: process.env.PORT,
  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
  /**
   * Database configs
   */
  db: {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 30000,
  },
  /**
   * JWT secret
   */
  jwt: {
    secret: process.env.JWT_SECRET,
    maxTokenAge: "12h",
    // algorithm: "RS512",
  },
};
