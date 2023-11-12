import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model';
// import { IUser } from '../modules/user/user.interface';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "fhc-secrete-key";

// User Login for getting token
const authenticateJWT = async (req: any, res: any, next?: any) => {
    const refresh_token = req.cookies.refresh_token;
    console.log("====", { refresh_token });




    const authHeader = req?.headers?.authorization;
    console.log("====", { authHeader });
    const setUnauthorized = () => {
        req.auth = false;
        req.user = null;
        req.user_details = null;
        req.token = null;
        req.remember_token = null;
    }

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            // console.log("====Token====", token);
            const user_res = await User.findOne({ remember_token: token }).select('-password');
            // console.log("====User====", user_res);
            if (!user_res) {
                setUnauthorized();
            } else {
                const { token: remember_token } = user_res;

                jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: "Server Error!!!"
                        });
                    }
                    req.user = user;
                    req.auth = true;
                    req.token = token;
                    req.remember_token = remember_token;
                    req.user_details = user_res;
                    // console.log({user: user});
                    // console.log("====Token====", token);
                });
                // next();
            }
        } catch (error) {
            console.log({ error });
            setUnauthorized();
        }

    } else {
        setUnauthorized();
    }
};

export default authenticateJWT;