const mongoose = require("mongoose");

const AccountDetailsSchema = new mongoose.Schema(
    {
        business_id: {
            type: String,
            max: 150,
            length: 150,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            max: 20,
            length: 20,
            required: true,
        },
        income: {
            type: Number,
            default: 0
        },
        expenses: {
            type: Number,
            default: 0
        },
        debts: {
            type: Number,
            default: 0
        },
        assets: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("AccountDetails", AccountDetailsSchema);