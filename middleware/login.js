const userDtls = require("./fetchUserDtls");
const generateToken = require("../webToken/generateToken");
const validateUser = require("./validateUser");
const decryptHash = require("./decryptHash");

module.exports = async (req, res) => {
    try {
        let isUserPresent = await validateUser(req.body.userEmail);
        console.log("is user presnt ", isUserPresent);
        if (isUserPresent) {
            let decryptedHash = await decryptHash(isUserPresent.hash, isUserPresent.iv, isUserPresent.encryptedHash);
            // console.log("the decrypted hash is", decryptedHash)  
            if (decryptedHash === req.body.password) {
                delete req.body.password;
                decryptedHash = "";
                let userInfo = {
                    userName: isUserPresent.userName,
                    email: isUserPresent.email,
                    id: isUserPresent.id
                }
                let tasksList = await userDtls(userInfo.id);
                console.log("the task list is", tasksList)
                let accessToken = await generateToken(userInfo)
                return res.status(200).json({
                    status: "success",
                    tasksList,
                    userInfo,
                    accessToken,
                    message: "data fetched successfully"
                })
            }
            decryptedHash = "";
            delete req.body.password
            return res.status(401).json({
                status: "Fail",
                errorCode: "LO02",
                message: "",
                errorMsg: "Invalid User Name or Password"
            })
        }
        return res.status(401).json({
            status: "Fail",
            errorCode: "LO02",
            message: "",
            errorMsg: "Invalid User Name or Password"
        })
    } catch (error) {
        console.error("the error is", error)
        return res.status(500).json({
            errorCode: "LO01",
            errorMsg: error ? error.error ? error.error.errorMsg : error : "Internal Server Server. Please Contack support team"
        })
    }
}