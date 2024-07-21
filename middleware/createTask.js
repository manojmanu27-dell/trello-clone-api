const TaskList = require("../Schemas/TaskList");

module.exports = async (req, res) => {
    console.log("Inside create task")
    try {
        let createTask = new TaskList({
            "userId": req.body.userId,
            "status": req.body.status,
            "title": req.body.title,
            "description": req.body.description
        })
        await createTask.save();
        console.log("create task is", createTask)
        return res.status(200).json({
            status: "Success",
            errorCode: "",
            errorMsg: "",
            refId: createTask.id,
            message: "Task Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            errorCode: "CT01",
            errorMsg: error ? error.error ? error.error.errorMsg : error : "Internal Server Error. Please Contact Support Team"
        })
    }
}