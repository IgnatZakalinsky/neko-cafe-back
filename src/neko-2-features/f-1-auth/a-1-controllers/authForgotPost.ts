import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";
import {sendMail} from "../../f-2-gmail/gmail";
import {generatePassword} from "../generatePassword";

export const generateNewPassword = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user) res.status(404).json({error: 'Email address not found', in: 'generateNewPassword'});

        else {
            try {
                const password = await generatePassword(user._id);

                const info = await sendMail(
                    user.email,
                    'generated new password',
                    '<div style="color: lime; background-color: black; padding: 10px">' +
                    'new password: ' + password +
                    '</div>'
                );

                res.status(200).json({
                    status: "sent",
                    success: Boolean(info.accepted && info.accepted.length > 0),
                    info: DEV_VERSION && info,
                });

            } catch (e) {
                res.status(500)
                    .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'generateNewPassword/sendMail'});
            }
        }
    } catch (e) {
        res.status(500)
            .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'generateNewPassword/User.findOne'});

    }
};
