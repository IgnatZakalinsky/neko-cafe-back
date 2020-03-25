import {Request, Response} from "express";
import User, {IUser} from "./a-2-models/user";
import {DEV_VERSION} from "../../neko-1-config/app";
import uuidv1 from "uuid/v1";

export const findUserByToken = (f: (req: Request, res: Response, user: IUser) => void, inTry: string) =>
    async (req: Request, res: Response) => {
        try {
            const user: IUser | null = await User.findOne({token: req.body.token}).exec();

            if (!user || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!', in: inTry + '/findUserByToken/User.findOne'});

            else {
                const token = uuidv1();
                const tokenDeathTime = user.rememberMe
                    ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                    : new Date().getTime() + (1000 * 60 * 60 * 3); // 3 hours

                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: 'not updated?', in: inTry + '/User.findByIdAndUpdate'});

                    else {
                        f(req, res, newUser._doc as IUser);

                    }
                } catch (e) {
                    res.status(500).json({
                        error: 'some error',
                        errorObject: DEV_VERSION && e,
                        in: inTry + '/User.findByIdAndUpdate'
                    });

                }
            }
        } catch (e) {
            res.status(500).json({
                error: 'some error',
                errorObject: DEV_VERSION && e,
                in: inTry + '/findUserByToken/User.findOne'
            });

        }
    };
