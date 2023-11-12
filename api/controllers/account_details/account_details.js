const Business = require("../../models/Business/Business");
const Account = require("../../models/AccountDetails/AccountDetails");
const { ObjectId } = require("mongodb");
// const { mongoose } = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create_account: async (req, res) => {
        const { body } = req;
        const { month } = req.params;
        // console.log({ user, body });
        const { business_id, year } = body;

        try {
            if (!business_id || !month || !year) {
                return res.status(400).json({
                    status: false,
                    message: "business_id, year, month are required",
                });
            }
            const business_res = await Business.findById(business_id);
            // console.log({ business_res });
            if (!business_res) {
                return res.status(400).json({
                    status: false,
                    message: "Business not found by id: " + business_id,
                });
            }
            const account_res = await Account.findOne({ business_id, month, year });
            // console.log({ account_res });
            if (account_res) {
                return res.status(400).json({
                    status: false,
                    message: "Account already exists",
                });
            }
            console.log({ ...body, month });
            const new_account = new Account({ ...body, month });
            const result = await new_account.save();

            return res.status(200).json({
                status: true,
                message: "Account created successfully",
                data: result,
            });
        } catch (error) {

            return res.json(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    },

    get_all_accounts: async (req, res) => {
        const { business_id } = req.query;
        try {
            const result = await Account.find({ business_id }).select("-__v -business_id");
            return res.status(200).json({
                status: true,
                message: "All Accounts",
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    },

    update_account: async (req, res) => {
        const { body } = req;
        const { account_id } = req.params;
        try {
            const a_id = new ObjectId(account_id);
            const searchObj = { _id: a_id };
            const { month, year } = body;
            if (month || year) {
                return res.status(400).json({
                    status: false,
                    message: "month and year are not required",
                });
            }


            const update_res = await Account.updateOne(searchObj, body);
            if (update_res?.modifiedCount) {
                // console.log({ update_res });
                return res.status(200).json({
                    status: true,
                    message: "Account updated successfully",
                    data: await Account.findById(account_id).select("-__v"),
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "Account not found",
                });
            }
        } catch (error) {
            console.log({ error: error.message });
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    }
};

