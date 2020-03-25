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
const user_1 = __importDefault(require("./a-2-models/user"));
const app_1 = require("../../neko-1-config/app");
const v1_1 = __importDefault(require("uuid/v1"));
exports.findUserByToken = (f, inTry) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ token: req.body.token }).exec();
        if (!user || user.tokenDeathTime < new Date().getTime())
            res.status(401).json({ error: 'bad token!', in: inTry + '/findUserByToken/User.findOne' });
        else {
            const token = v1_1.default();
            const tokenDeathTime = user.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                : new Date().getTime() + (1000 * 60 * 60 * 3); // 3 hours
            try {
                const newUser = yield user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime }, { new: true }).exec();
                if (!newUser)
                    res.status(500)
                        .json({ error: 'not updated?', in: inTry + '/User.findByIdAndUpdate' });
                else {
                    f(req, res, newUser._doc);
                }
            }
            catch (e) {
                res.status(500).json({
                    error: 'some error',
                    errorObject: app_1.DEV_VERSION && e,
                    in: inTry + '/User.findByIdAndUpdate'
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            error: 'some error',
            errorObject: app_1.DEV_VERSION && e,
            in: inTry + '/findUserByToken/User.findOne'
        });
    }
});
//# sourceMappingURL=findUserByToken.js.map