import mongoose from "mongoose";
import User from "../../neko-2-features/f-1-auth/a-2-models/user";
import bCrypt from "bcrypt";

export const generatePassword = async (userId: mongoose.Types.ObjectId) => {
    const chars = 'ADEFGHJLMNPQRTYabdefghijmnpqrty2345679!@#$%^&*()-+=?.,'; // Il1Oo0CcSsUuVvWwXxZzB8Kk

    let password = '';
    for (let i = 0; i < 9; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    await User.findByIdAndUpdate(
        userId,
        {password: await bCrypt.hash(password, 10),},
        {new: true}
    ).exec();

    return password;
};
