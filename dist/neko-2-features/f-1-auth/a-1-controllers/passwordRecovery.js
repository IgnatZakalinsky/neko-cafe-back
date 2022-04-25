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
const gmail_1 = require("../../../neko-3-helpers/h-1-gmail/gmail");
const generateResetPasswordToken_1 = require("../../../neko-3-helpers/h-2-users/generateResetPasswordToken");
exports.passwordRecovery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email }).exec();
        if (!user)
            res.status(404).json({ error: 'Email address not found', in: 'passwordRecovery' });
        else {
            try {
                const resetPasswordToken = yield generateResetPasswordToken_1.generateResetPasswordToken(user._id);
                const html = (req.body.html1 ||
                    '<div style="color: lime; background-color: black; padding: 10px">' +
                        'password recovery link: ' +
                        `<a href="http://localhost:3000/#/set-new-password/${resetPasswordToken}">` +
                        `http://localhost:3000/#/set-new-password/${resetPasswordToken}` +
                        '</a>' +
                        '<div>resetPasswordToken: ') +
                    resetPasswordToken +
                    (req.body.html2 ||
                        '</div>' +
                            '</div>');
                const info = yield gmail_1.sendMail(user.email, 'password recovery', html);
                res.status(200).json({
                    status: "sent",
                    success: Boolean(info.accepted && info.accepted.length > 0),
                    info: app_1.DEV_VERSION && info,
                    html,
                });
            }
            catch (e) {
                res.status(500)
                    .json({ error: 'some error', errorObject: app_1.DEV_VERSION && e, in: 'passwordRecovery/sendMail' });
            }
        }
    }
    catch (e) {
        res.status(500)
            .json({ error: 'some error', errorObject: app_1.DEV_VERSION && e, in: 'passwordRecovery/User.findOne' });
    }
});
//# sourceMappingURL=passwordRecovery.js.map