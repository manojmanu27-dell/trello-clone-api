const fetchUserDtls = require("./fetchUserDtls");
const Users = require("../Schemas/Users");

module.exports = async (req, res) => {
    try {
        console.log("Inside fetch user tasks list")
        let id = req.params.id;
        console.log("the id is", id);
        if (id) {
            let isUserPresent = await Users.findById(id);
            console.log("is the user present")
            if (isUserPresent) {
                let taskList = await fetchUserDtls(id);
                return res.status(200).json({
                    status: "success",
                    message: "Data fetched successfully",
                    taskList: taskList
                })
            } else {
                return res.status(500).json({
                    staus: 'fail',
                    message: "",
                    errorCode: "FUT01",
                    errorMessage: "Internal Server error"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            errorCode: "LO01",
            errorMsg: error
        })
    }
}