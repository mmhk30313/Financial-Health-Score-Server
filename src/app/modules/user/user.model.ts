import { IUser } from './user.interface';
import mongoose, { Schema, model, Model } from "mongoose";
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
        },
        mobile: {
            type: String,
        },
        address: {
            type: String,
        },
        otp: {
            type: String,
        },
        token: {
            type: String,
        }

    },
    { timestamps: true }
);


const User = model<IUser>("User", userSchema);

export default User;
