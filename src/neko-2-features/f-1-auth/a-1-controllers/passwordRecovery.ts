import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";
import {sendMail} from "../../../neko-3-helpers/h-1-gmail/gmail";
import {generateResetPasswordToken} from "../../../neko-3-helpers/h-2-users/generateResetPasswordToken";

export const passwordRecovery = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user) res.status(404).json({error: 'Email address not found', in: 'passwordRecovery'});

        else {
            try {
                const resetPasswordToken = await generateResetPasswordToken(user._id);

                const info = await sendMail(
                    user.email,
                    'password recovery',
                    '<div style="color: lime; background-color: black; padding: 10px">' +
                    'password recovery link: ' +
                    `<a href="http://localhost:3000/#/set-new-password/${resetPasswordToken}">` +
                    `http://localhost:3000/#/set-new-password/${resetPasswordToken}` +
                    '</a>' +
                    `<div>resetPasswordToken: ${resetPasswordToken}</div>` +
                    '</div>'
                );

                res.status(200).json({
                    status: "sent",
                    success: Boolean(info.accepted && info.accepted.length > 0),
                    info: DEV_VERSION && info,
                });

            } catch (e) {
                res.status(500)
                    .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'passwordRecovery/sendMail'});
            }
        }
    } catch (e) {
        res.status(500)
            .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'passwordRecovery/User.findOne'});

    }
};
