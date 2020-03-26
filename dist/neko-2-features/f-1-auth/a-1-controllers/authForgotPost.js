"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../a-2-models/user"));
const app_1 = require("../../../neko-1-config/app");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.generateNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email }).exec();
        if (!user)
            res.status(404).json({ error: 'Email address not found', in: 'generateNewPassword' });
        else {
            // res.status(500).json({error: "sorry, I can't send new password on your email"});
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                // host: 'smtp.ethereal.email',
                // port: 587,
                // secure: false,
                auth: {
                    user: process.env.GMAIL_USER || '',
                    pass: process.env.GMAIL_PASS || ''
                }
            });
            const info = yield transporter.sendMail({
                from: 'Neko-cafe',
                to: 'ai73a@yandex.ru',
                subject: 'gmail test',
                text: 'test text',
            });
            // for accept
            // https://myaccount.google.com/lesssecureapps
            console.log('gmail info: ', info);
            res.status(500).json({ status: "send" });
        }
    }
    catch (e) {
        res.status(500)
            .json({ error: 'some error', errorObject: app_1.DEV_VERSION && e, in: 'generateNewPassword/User.findOne' });
    }
});
//# sourceMappingURL=authForgotPost.js.map