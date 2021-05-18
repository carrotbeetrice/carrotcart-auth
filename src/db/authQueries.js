const pool = require("./pool").getPool();
const sql = require("sql-bricks-postgres");
const _ = require("underscore");
const hashUtils = require("../utils/hash");

module.exports = {
  /**
   * Registration query
   */
  registerCustomer: async (body) => {
    let hash = await Promise.resolve(hashUtils.hashPassword(body.password));

    let newCustomerData = _.omit(body, "password");
    newCustomerData.hash = hash;

    const registerQuery = sql
      .insert("Customer", _.keys(newCustomerData))
      .select()
      .from(sql.values(newCustomerData).as("v").columns().types())
      .where(
        sql.not(
          sql.exists(
            sql.select("id").from("Customer").where({ email: body.email })
          )
        )
      )
      .returning("id")
      .toParams();

    return new Promise((resolve, reject) => {
      pool.query(registerQuery.text, registerQuery.values, (err, result) => {
        if (err) reject(err);
        else return resolve(result.rows[0]);
      });
    }).catch((err) => {
      console.error(err);
      return { id: -1, error: err };
    });
  },

  /**
   * Login query
   */
  loginCustomer: async (body) => {
    var loginResult = {
      success: true,
    };

    const loginQuery = sql
      .select(["id", "email", "hash"])
      .from("Customer")
      .where({ email: body.email })
      .toParams();

    let checkEmailPromise = new Promise((resolve) => {
      pool.query(loginQuery.text, loginQuery.values, (err, result) => {
        if (err) {
          console.error(err);
          return resolve({ id: -1 });
        } else {
          return resolve(result.rows[0]);
        }
      });
    });

    let customerData = await Promise.resolve(checkEmailPromise);

    if (!customerData) {
      loginResult.success = false;
      loginResult.reason = "No such user exists";
      return loginResult;
    }

    if (customerData.id < 0) {
      throw Error("Error logging in");
    }

    let correctPassword = await Promise.resolve(
      hashUtils.checkPassword(body.password, customerData.hash)
    );

    if (!correctPassword) {
      loginResult.success = false;
      loginResult.reason = "Incorrect password";
      return loginResult;
    }

    loginResult.data = { id: customerData.id };
    return loginResult;
  },
};
