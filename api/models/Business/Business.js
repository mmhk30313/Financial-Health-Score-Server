const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 5,
            max: 30,
            required: true,
        },
        user_email: {
            type: String,
            max: 50,
            length: 50,
            required: true,
        },
        description: {
            type: String,
            max: 500,
            length: 500,
            default: ""
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);