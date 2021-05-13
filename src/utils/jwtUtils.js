const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;

module.exports = {
    generateToken: (payload) => {
        let options = {
            expiresIn: jwtConfig.maxTokenAge,
            // algorithm: jwtConfig.algorithm
        };
        let token = jwt.sign(payload, jwtConfig.secret, options);
        return token;
    },
    verifyToken: (token) => {
        // Throws error if token is invalid
        jwt.verify(token, jwtConfig.secret);
    },
}