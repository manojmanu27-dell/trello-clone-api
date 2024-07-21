const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (input) => {
    return new Promise((resolve, reject) => {
        jwt.sign(input, config.get("jwtConfig").secretKey, {
            algorithm: "HS256",
            expiresIn: config.get("jwtConfig").expiresIn
        }, (err, token) => {
            if (err) {
                return reject("Internal Server Error.Please Contact support team");
            }
            return resolve(token)
        })
    })


}
