const crypto = require("crypto");
const config = require("config");

module.exports = async (password) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("Inside generate hash function");
            let cryptoKey = crypto.randomBytes(32);
            let cryptoIv = crypto.randomBytes(16);
            let cipherKey = crypto.createCipheriv(config.get("hashProperties").algo, cryptoKey, cryptoIv);
            let finalHash = cipherKey.update(password, 'utf8', 'hex');
            finalHash += cipherKey.final('hex');
            return resolve({ cryptoKey, cryptoIv, finalHash });
        } catch (error) {
            console.error("There is an Error while generating hash", error)
            return reject("Error while generating hash");
        }
    })
}
