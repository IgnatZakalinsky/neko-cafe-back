import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";

export const generateNewPassword = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user) res.status(404).json({error: 'Email address not found', in: 'generateNewPassword'});

        else {
            res.status(500).json({error: "sorry, I can't send new password on your email"});

        }
    } catch (e) {
        res.status(500)
            .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'generateNewPassword/User.findOne'})
    }
};
