const Users = require("../Schemas/Users");
const validateUser = require("./validateUser");
const userDtls = require("./fetchUserDtls");

module.exports = async (req, res) => {
    try {
        if (req.body) {
            let accessToken = "";
            let taskList = [];
            let userInfo = {};
            let gmailInfo = JSON.parse(atob(req.body.credential.split(".")[1]));
            console.log("the gmail info is", gmailInfo)
            let isUserPresent = validateUser(gmailInfo.email);
            console.log("user information is", isUserPresent);
            if (isUserPresent) {
                userInfo = {
                    userName: isUserPresent.userName,
                    email: isUserPresent.email,
                    id: isUserPresent.id
                }
                taskList = await userDtls(userInfo.id);
                console.log("the task list is", taskList)
            } else {
                const newUser = new Users({
                    userName: req.body.userName,
                    email: gmailInfo.email,
                    googleAuth: "Y"
                })
                let userNew = await newUser.save();
                console.log("new user created is", userNew);
                userInfo = {
                    userName: userNew.userName,
                    email: userNew.email,
                    id: userNew.id
                }
            }
            accessToken = await generateToken(userInfo)
            return res.status(200).json({
                status: 'success',
                errorCode: "",
                taskList,
                userInfo,
                accessToken,
                message: "User Data Fetched Successfully."
            })
        }
    } catch (error) {
        console.log("error in google login is", error)
        return res.status(500).json({
            errorCode: "GL01",
            errorMsg: error ? error.error ? error.error.errorMsg : error : "Internal Server Server. Please Contack support team"
        })
    }
}