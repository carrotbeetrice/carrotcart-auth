const Pool = require("pg").Pool;
const dbConfig = require("../config/config").db;

var pool;

module.exports = {
  getPool: () => {
    if (!pool) {
      pool = new Pool(dbConfig);
    }
    return pool;
  },
};
