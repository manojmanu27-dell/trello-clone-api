const TaskList = require("../Schemas/TaskList");
const moment = require("moment");

module.exports = (id) => {
    console.log("Inside fetch User Details", id)
    return new Promise(async (resolve, reject) => {
        try {
            let taskList = await TaskList.find({ userId: id });
            if (taskList) {
                return resolve(taskList);
            } else {
                return reject("No Data");
            }
        } catch (error) {
            console.error("Inside Catch of fetch userDtls", error)
            return reject(error)
        }
    })
}