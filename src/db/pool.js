const Pool = require("pg").Pool;
const db = require("../config/config").db;

var pool;

module.exports = {
  getPool: () => {
    if (!pool) {
      const conString = db.uri;
      if (!conString) {
        pool = new Pool(db.config);
      } else {
        pool = new Pool({ connectionString: conString });
      }
    }
    return pool;
  },
};
