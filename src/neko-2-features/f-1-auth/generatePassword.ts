import mongoose from "mongoose";
import User from "./a-2-models/user";
import bCrypt from "bcrypt";

export const generatePassword = async (userId: mongoose.Types.ObjectId) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+=?.,';

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
