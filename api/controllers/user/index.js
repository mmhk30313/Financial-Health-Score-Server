const User = require("../../models/User/User");

// User update only for user
exports.update_user = async (req, res) => {
    const { body: user_body } = req;
    const user_email = req?.user?.email;
    // console.log({ user_body });
    try {

        const result = await User.findOneAndUpdate({ email: user_email }, user_body, { returnOriginal: true }).select("-password -remember_token -otp");
        // console.log({result});
        if (result) {
            const updated_user = await User.findOne({ email: user_email }).select("-password -remember_token -otp -isVerified");
            // console.log({ updated_user });
            return res.status(200).json({
                status: true,
                message: "User is updated!!!",
                data: updated_user,
            });

        } else {
            return res.status(404).json({
                status: false,
                message: "User isn't found to update!!!"
            });
        }
    } catch (error) {
        return res.status(503).json({
            success: false,
            message: error?.message || "Something wrong to update this user"
        })
    }
};

// User will find his/her details by accessToken
exports.find_user_details = async (req, res) => {
    const { user_details } = req;
    delete user_details?.password;
    const user = { ...user_details?._doc };
    delete user?.remember_token;
    console.log({ user_details: user });
    return res.status(200).json({
        status: true,
        message: "User is found!!!",
        data: user
    });
}

// Find all users
exports.find_all_users = async (req, res) => {
    try {
        const users = await User.find({})
            .select("_id user_name address gender email");

        console.log("======101=====", { user_length: users?.length });
        if (users?.length) {
            return res.status(200).json({
                status: true,
                data: users,
            })
        }
        return res.status(400).json({
            status: false,
            message: "There is no user!!!"
        })

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error?.message || "Server error!!!"
        })
    }
}

// Find user by user email
exports.find_user_by_email = async (req, res) => {
    const { email: param_email } = req?.params;
    const email = param_email;
    try {
        const findObj = { email };
        console.log({ findObj });
        const user = await User.findOne(findObj)
            .select("-password -remember_token -otp -isVerified");

        console.log({ user_length: user });
        if (user) {
            return res.status(200).json({
                status: true,
                data: user,
            })
        }
        return res.status(404).json({
            status: false,
            message: "There is no user by this email!!!"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error?.message || "Server error!!!"
        })
    }
}



