import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import uuidv1 from "uuid/v1";
import {DEV_VERSION} from "../../../neko-1-config/app";
import bCrypt from "bcrypt";

export const logIn = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user || await bCrypt.compare(req.body.password, user.password))
            res.status(400).json({error: 'not correct email/password', in: 'logIn'});

        else {
            const token = uuidv1();
            const tokenDeathTime = req.body.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 days
                : new Date().getTime() + (1000 * 60 * 60 * 3); // 3 hours

            try {
                const newUser: IUser | null = await User.findByIdAndUpdate(
                    user._id,
                    {token, tokenDeathTime, rememberMe: !!req.body.rememberMe},
                    {new: true}
                ).exec();

                if (!newUser) res.status(500)
                    .json({error: 'not updated?', in: 'logIn/User.findByIdAndUpdate'});

                else {
                    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    // res.cookie('token', token, {maxAge: tokenDeathTime});

                    // if (DEV_VERSION) console.log('IUser?: ', {...newUser}); // for dev => _doc!!!
                    const body: any = {...newUser._doc}; // _doc!!!
                    delete body.password; // don't send password to the front
                    res.status(200).json(body);

                }
            } catch (e) {
                res.status(500)
                    .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'logIn/User.findByIdAndUpdate'});
            }
        }
    } catch (e) {
        res.status(500).json({error: 'some error', errorObject: DEV_VERSION && e, in: 'logIn/User.findOne'});

    }
};
