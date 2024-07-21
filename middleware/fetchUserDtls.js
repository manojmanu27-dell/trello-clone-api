const TaskList = require("../Schemas/TaskList");
const moment = require("moment");

module.exports = (id) => {
    console.log("Inside fetch User Details", id)
    return new Promise(async (resolve, reject) => {
        try {
            let taskList = await TaskList.find({ userId: id });
            if (taskList) {
                taskList.forEach((item) => {
                    console.log("the data is",moment(item.createdDate).format("DD/MM/YYYY hh:mm:s"))
                    item.createdDate = moment(item.createdDate).format("DD/MM/YYYY hh:mm:s");
                    item.updatedDate = moment(item.updatedDate).format("DD/MM/YYYY hh:mm:s");
                })
                console.log("inside checking the data",taskList)
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