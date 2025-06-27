const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["seller", "buyer"],
        default: "buyer",
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;