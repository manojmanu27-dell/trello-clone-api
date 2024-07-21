const crypto = require("crypto");
const config = require("config");

module.exports = (hash, iv, key) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("Inside decrypt hash function");
            let cryptoKey = Buffer.from(key, 'hex');
            let cryptoIv = Buffer.from(iv, 'hex');
            let cipherKey = crypto.createDecipheriv(config.get("hashProperties").algo, cryptoKey, cryptoIv);
            let finalHash = cipherKey.update(hash, 'hex', 'utf8');
            finalHash += cipherKey.final('utf8');
            return resolve(finalHash);
        } catch (error) {
            console.error("error while decrypting has", error);
            return reject("Error Occured While Decrypting the hash")
        }
    })
}
