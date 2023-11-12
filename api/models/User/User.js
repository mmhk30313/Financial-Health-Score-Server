const mongoose = require("mongoose");

// user_name: string;
// email: string;
// password: string;
// mobile: string;
// address: string;
// otp: string;
// isVerified: boolean;
// remember_token: string;

const UserSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            min: 3,
            max: 20,
            default: "",
        },
        email: {
            type: String,
            max: 50,
            length: 50,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            max: 15,
            length: 15,
            default: ""
        },
        password: {
            type: String,
            min: 5,
            max: 14,
            length: 14,
        },
        otp: {
            type: Number,
            default: 1234
        },
        address: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            max: 10,
            length: 10,
            default: ""
        },
        isVerified: {
            type: Boolean,
            default: true,
        },
        remember_token: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);