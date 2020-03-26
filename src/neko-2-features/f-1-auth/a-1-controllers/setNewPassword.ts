import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";
import bCrypt from "bcrypt";
import {passwordValidator} from "../../../neko-3-helpers/h-2-users/validators";

export const setNewPassword = async (req: Request, res: Response) => {
        try {
            const user: IUser | null = await User.findOne({token: req.body.resetPasswordToken}).exec();

            if (!user || user.resetPasswordTokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!', in: 'setNewPassword/User.findOne'});

            else if (!passwordValidator(req.body.password)) {
                res.status(400).json({
                    error: 'Password not valid! must be more than 7 characters...',
                    password: req.body.password,
                    in: 'createUser'
                });

            } else {
                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {password: await bCrypt.hash(req.body.password, 10)},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: 'not updated?', in: 'setNewPassword/User.findByIdAndUpdate'});

                    else {
                        res.status(200).json({success: true})

                    }
                } catch (e) {
                    res.status(500).json({
                        error: 'some error',
                        errorObject: DEV_VERSION && e,
                        in: 'setNewPassword/User.findByIdAndUpdate'
                    });

                }
            }
        } catch
            (e) {
            res.status(500).json({
                error: 'some error',
                errorObject: DEV_VERSION && e,
                in: 'setNewPassword/User.findOne'
            });

        }
    }
;
