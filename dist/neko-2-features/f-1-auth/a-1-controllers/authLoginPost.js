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
const v1_1 = __importDefault(require("uuid/v1"));
const app_1 = require("../../../neko-1-config/app");
exports.authLoginPost = (path, auth) => auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email }).exec();
        if (!user || user.password !== req.body.password) // will be added bCrypt
            res.status(400).json({ error: 'not correct email/password' });
        else {
            const token = v1_1.default();
            const tokenDeathTime = req.body.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 days
                : new Date().getTime() + (1000 * 60 * 60 * 3); // 3 hours
            try {
                const newUser = yield user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime, rememberMe: !!req.body.rememberMe }, { new: true })
                    .exec();
                if (!newUser)
                    res.status(500).json({ error: 'not updated?', in: 'authLoginPost' });
                else {
                    if (app_1.DEV_VERSION)
                        console.log('IUser?: ', Object.assign({}, newUser)); // for dev => _doc!!!
                    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    // res.cookie('token', token, {maxAge: tokenDeathTime});
                    const body = Object.assign({}, newUser._doc); // _doc!!!
                    delete body.password; // don't send password to the front
                    res.status(200).json(body);
                }
            }
            catch (e) {
                res.status(500)
                    .json({
                    error: 'some error',
                    errorObject: app_1.DEV_VERSION && e,
                    in: 'authLoginPost/User.findByIdAndUpdate'
                });
            }
        }
    }
    catch (e) {
        res.status(500)
            .json({ error: 'some error', errorObject: app_1.DEV_VERSION && e, in: 'authLoginPost/User.findOne' });
    }
}));
// const pass = "somePass";
// const hashPass = await bCrypt.hash(pass, 10);
// console.log(await bCrypt.compare(pass, hashPass));
// console.log(await bCrypt.compare(pass + '2', hashPass));
//# sourceMappingURL=authLoginPost.js.map