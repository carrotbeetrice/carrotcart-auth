const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = {
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return reject(err);
        else return resolve(hash);
      });
    });
  },
  checkPassword: (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, passed) => {
        if (err) return reject(false);
        return resolve(passed);
      });
    });
  },
};
