const Users = require("../Schemas/Users");

module.exports = async (email) => {
    console.log("Inside validate User");
    try {
        if (email) {
            let user = await Users.findOne({ email });
            console.log("the user is", user)
            if (user) {
                return user;
            }
        }
        return false;
    } catch (error) {
        console.error("Error occured while validating user", error);
        return false;
    }
}
