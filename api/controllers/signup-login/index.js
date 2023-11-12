const jwt = require('jsonwebtoken');
// This token_key is same to auth file token_key
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "hfc_secret_key";
const bcrypt = require("bcrypt");
const User = require("../../models/User/User");
const development_mode = process.env.NODE_ENV === 'development';
console.log({ development_mode });

// User login for getting token
exports.login_user = async (req, res) => {
    const { email, password } = req?.body;
    console.log({ email, password });

    if (!email || !password) {
        return res.status(406).json({
            status: false,
            message: "Email or password is missing",
        })
    }
    const searchObj = { email };
    try {
        // const pipeline = [
        //     {
        //         $match: searchObj,
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             email: 1,
        //             user_name: 1,
        //             password: 1,
        //             isVerified: 1,
        //             address: 1,
        //             gender: 1,
        //         }
        //     }
        // ];

        // const user_ag_res = await User.aggregate(pipeline);
        const user_ag_res = await User.findOne(searchObj).select('-remember_token -__v').maxTimeMS(30000);;
        const user = user_ag_res;
        console.log({ user: user });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found!" });
        }

        // let validPassword = password === user?.password;
        let validPassword = await bcrypt.compare(password, user?.password);
        if (!validPassword) {
            return res.status(400).json({ status: false, message: "Wrong password" });
        }
        const tokenObject = { email: user?.email, name: user?.user_name };
        const accessToken = jwt.sign(tokenObject, accessTokenSecret);
        delete user.password;
        const dataObj = {
            remember_token: accessToken,
        };
        await User.updateOne(searchObj, dataObj).maxTimeMS(30000);;
        return res.status(200).json({
            status: true,
            message: "User is logged in successfully!!!",
            data: {
                user: {
                    email: user?.email,
                    name: user?.user_name
                },
                accessToken
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error?.message || "Server error"
        })
    }

};

// User registration
exports.sign_up_user = async (req, res) => {
    const { body } = req;
    console.log("====Body====", { body });
    // const now = new Timestamp(new Date());
    // console.log({now});
    const { password, confirm_password, email } = body;
    if (password !== confirm_password) {
        return res.status(406).json({
            status: false,
            message: password.length < 5 ? "Password length should be greater than 5 !!!" : "Your password and confirm password are not matched"
        })
    } else {
        try {
            const already_exist_user = await User.findOne({ email });
            if (already_exist_user) {
                return res.status(200).json({
                    status: false,
                    message: "This email is already exist for another user",
                });
            } else {
                const user_body = body;
                console.log({ user_body });
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user_body.password = hashedPassword;
                delete user_body.confirm_password;
                const newUser = new User(user_body);

                const res_signup = await newUser.save();
                const user = res_signup?._doc;
                console.log({ user });

                if (user) {
                    const tokenObject = { email: user?.email, name: user?.user_name, user_role: user?.user_role, avatar: user?.avatar };
                    const accessToken = jwt.sign(tokenObject, accessTokenSecret);
                    const dataObj = {
                        remember_token: accessToken,
                    };
                    await User.updateOne({ email }, dataObj);
                    return res.status(200).json({
                        status: true,
                        message: "The user is signed up successfully!!!",
                        data: { user: { email: user?.email, name: user?.user_name }, accessToken },
                    });
                } else {
                    return res.status(500).json({
                        status: false,
                        message: "Server error"
                    });
                }
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error?.message || "Something wrong"
            })
        }
    }
};


