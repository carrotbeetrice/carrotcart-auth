const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = {
  hashPassword: (password) => {
    let hashPromise = new Promise((resolve) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return resolve("");
        else return resolve(hash);
      });
    });
    return hashPromise;
  },
  checkPassword: (password, hash) => {
    let comparePromise = new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, passed) => {
        if (err) return reject(false);
        return resolve(passed);
      });
    });
    return comparePromise;
  },
};
