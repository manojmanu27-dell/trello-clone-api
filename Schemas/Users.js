const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: String,
    encryptedHash: String,
    iv: String,
    googleAuth: {
        type: String,
        default: "N"
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);