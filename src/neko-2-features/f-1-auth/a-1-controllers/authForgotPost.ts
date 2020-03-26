import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";
import nodeMailer from "nodemailer";

export const generateNewPassword = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user) res.status(404).json({error: 'Email address not found', in: 'generateNewPassword'});

        else {
            // res.status(500).json({error: "sorry, I can't send new password on your email"});

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                // host: 'smtp.ethereal.email',
                // port: 587,
                // secure: false,
                auth: {
                    user: process.env.GMAIL_USER || '',
                    pass: process.env.GMAIL_PASS || ''
                }
            });

            const info = await transporter.sendMail({
                from: 'Neko-cafe',
                to: 'ai73a@yandex.ru',
                subject: 'gmail test',
                text: 'test text',
                // html: '<div style="color: lime; background-color: black">test html</div>',
            });

            // for accept
            // https://myaccount.google.com/lesssecureapps
            console.log('gmail info: ', info);

            res.status(500).json({status: "send"});

        }
    } catch (e) {
        res.status(500)
            .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'generateNewPassword/User.findOne'})
    }
};
