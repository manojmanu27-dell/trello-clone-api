const crypto = require("crypto");
let cryptoKey = crypto.randomBytes(32);
let cryptoIv = crypto.randomBytes(16);
let mykey = crypto.createCipheriv('aes-256-cbc', cryptoKey, cryptoIv);
let mystr = mykey.update('abc', 'utf8', 'hex')
mystr += mykey.final('hex');
console.log("the final strin gis",mystr)

let decrypted = crypto.createDecipheriv('aes-256-cbc',cryptoKey,cryptoIv);
let myKey1 = decrypted.update(mystr,'hex','utf8');
myKey1 += decrypted.final('utf8');
 console.log("the fianl key is",myKey1)