const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    jwt.verify(req.headers['access-token'], config.get("jwtConfig").secretKey, {
        complete: true
    }, (err, valid) => {
        console.log("the ererror is ", err);
        console.log("the valis", valid);
        if (err) {
            return res.status(500).json({
                status: "Fail",
                errorCode: "JWV01",
                errorMsg: err.message?err.message:err
            })
        }
        next();
    })
}