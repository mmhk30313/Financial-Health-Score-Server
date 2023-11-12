const Business = require("../../models/Business/Business");
const AccountDetails = require("../../models/AccountDetails/AccountDetails");
const { ObjectId } = require("mongodb");
// const { mongoose } = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    create_business: async (req, res) => {
        const user = req?.user;
        const { body } = req;
        // console.log({ user, body });
        const { user_email, title } = body;

        try {
            if (!user_email || !title) {
                return res.status(400).json({
                    status: false,
                    message: "User email and title is required",
                });
            } else if (user_email !== user?.email) {
                return res.status(400).json({
                    status: false,
                    message: "User email is not valid",
                });
            }

            const new_business = new Business(body);
            const result = await new_business.save();

            return res.status(200).json({
                status: true,
                message: "Business created successfully",
                data: result,
            });
        } catch (error) {

            return res.json(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    },

    get_all_businesses: async (req, res) => {
        const user = req?.user;
        console.log({ user });
        try {
            const result = await Business.find({ user_email: user?.email });
            return res.status(200).json({
                status: true,
                message: "All Businesses",
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    },

    update_business: async (req, res) => {
        const { body } = req;
        const { business_id } = req.query;
        // console.log({ business_id, body });
        try {
            const b_id = new ObjectId(business_id);
            const searchObj = { _id: b_id };
            console.log({ searchObj });
            const update_res = await Business.updateOne(searchObj, body);

            return res.status(200).json({
                status: true,
                message: "Business updated successfully",
                data: update_res,
            });
        } catch (error) {
            console.log({ error: error.message });
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error",
            });
        }
    },

    delete_business: async (req, res) => {
        const { business_id } = req.params;
        console.log({ business_id });
        try {
            const b_id = business_id;
            const searchObj = { _id: b_id };
            const business_res = await Business.findById(b_id);
            console.log({ business_res });
            if (!business_res) {
                return res.status(404).json({
                    status: false,
                    message: "Business not found",
                });
            } else {
                const delete_res = await Business.deleteOne(searchObj);
                if (delete_res?.deletedCount === 0) {
                    return res.status(404).json({
                        status: false,
                        message: "Business not found",
                    });
                }
                const res_many = await AccountDetails.deleteMany({ business_id });
                console.log({ res_many });
                return res.status(200).json({
                    status: true,
                    message: "Business and it's related accounts are deleted successfully"
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

