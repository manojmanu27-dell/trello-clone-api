const Users = require("../Schemas/Users");
const validateUser = require("./validateUser");
const generateHash = require("./createHash");
const generateToken = require("../webToken/generateToken");

module.exports = async (req, res) => {
     try {
          let isUserPresent = await validateUser(req.body.userEmail);
          console.log("Is the user present", isUserPresent);
          if (!isUserPresent) {
               delete req.body.confirmPassword;
               let hashObj = await generateHash(req.body.password);
               console.log("the hash object is", hashObj);
               delete req.body.password;
               const newUser = new Users({
                    userName: req.body.userName,
                    email: req.body.userEmail,
                    hash: hashObj.finalHash,
                    encryptedHash: hashObj.cryptoKey.toString('hex'),
                    iv: hashObj.cryptoIv.toString('hex')
               })
               let userNew = await newUser.save();
               console.log("new user created is", userNew);
               let userInfo = {
                    userName: userNew.userName,
                    email: userNew.email,
                    id: userNew.id
               }
               let accessToken = await generateToken(userInfo)
               return res.status(200).json({
                    status: 'success',
                    errorCode: "",
                    taskList: [],
                    userInfo,
                    accessToken,
                    message: "User Created Successfully. Please Login"
               })
          } else {
               return res.status(500).json({
                    status: 'success',
                    errorCode: "SU02",
                    message: "User Already exists. Please Login"
               })
          }
     } catch (error) {
          return res.status(500).json({
               errorCode: "SU01",
               errorMsg: error.errorMsg
          })

     }
}