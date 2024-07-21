const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        retured: true
    },
    title: {
        type: String,
        retured: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("TaskList", TaskSchema);