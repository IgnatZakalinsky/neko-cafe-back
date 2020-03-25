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
const validators_1 = require("../validators");
const app_1 = require("../../../neko-1-config/app");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validators_1.emailValidator(req.body.email)) {
        res.status(400).json({
            error: 'Email not valid!'
                + (app_1.DEV_VERSION ? ' /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')' : ''),
            email: req.body.email,
            in: 'createUser'
        });
    }
    else if (!validators_1.passwordValidator(req.body.password)) {
        res.status(400).json({
            error: 'Password not valid! must be more than 7 characters...',
            password: req.body.password,
            in: 'createUser'
        });
    }
    else {
        try {
            const user = yield user_1.default.create({
                email: req.body.email,
                password: yield bcrypt_1.default.hash(req.body.password, 10),
                rememberMe: false,
                isAdmin: false,
                name: req.body.email,
            });
            const addedUser = Object.assign({}, user);
            delete addedUser.password; // don't send password to the front
            res.status(201).json({ addedUser, success: true });
        }
        catch (e) {
            res.status(500).json({
                error: 'some error',
                errorObject: app_1.DEV_VERSION && e,
                in: 'createUser/User.create'
            });
        }
    }
});
//# sourceMappingURL=authRegisterPost.js.map