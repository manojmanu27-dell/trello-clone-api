const TaskList = require("../Schemas/TaskList");

module.exports = async (req, res) => {
    try {
        let taskId = req.body.taskId;
        let isTaskPresent = await TaskList.findById(taskId);
        console.log("is the task present", isTaskPresent)
        if (isTaskPresent) {
            if (req.body.type === 'update') {
                let updateTask = await TaskList.findByIdAndUpdate(taskId, { description: req.body.description, status: req.body.status, title: req.body.title });
                console.log("Is the task updated", updateTask)
                return res.status(200).json({
                    status: "success",
                    message: "Task Updated Successfully",
                    errorCode: "",
                    errorMsg: ""
                })
            } else {
                let deletedTask = await TaskList.findByIdAndDelete(taskId);
                console.log("the deleted task is", deletedTask);
                return res.status(200).json({
                    status: "success",
                    message: `Task with description ${deletedTask.description} been deleted Successfully`,
                    errorCode: "",
                    errorMsg: ""
                })
            }
        } else {
            return res.status(500).json({
                status: "fail",
                errorMsg: `Invalid task ref id ${taskId}`,
                errorCode: "MTD02",
                message: ""
            })
        }
    } catch (error) {
        console.error("there is an error in modify task details", error)
        return res.status(500).json({
            errorCode: "MTD01",
            errorMsg: error ? error.error ? error.error.errorMsg : error : "Internal server error. Please Contact Support Team"
        })
    }
}