import mongoose from "mongoose";
import User from "../../neko-2-features/f-1-auth/a-2-models/user";
import uuidv1 from "uuid/v1";

export const generateResetPasswordToken = async (userId: mongoose.Types.ObjectId) => {
    // const chars = 'ADEFGHJLMNPQRTYabdefghijmnpqrty2345679!@#$%^&*()-+=?.,'; // Il1Oo0CcSsUuVvWwXxZzB8Kk
    //
    // let password = '';
    // for (let i = 0; i < 9; i++) {
    //     password += chars[Math.floor(Math.random() * chars.length)];
    // }

    const resetPasswordToken = uuidv1();

    await User.findByIdAndUpdate(
        userId,
        {resetPasswordToken, resetPasswordTokenDeathTime: new Date().getTime() + (1000 * 60 * 10)}, // 10 min
        {new: true}
    ).exec();

    return resetPasswordToken;
};
