const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: String,
    iv: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);