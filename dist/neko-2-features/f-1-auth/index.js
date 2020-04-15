"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUsersForDev_1 = require("./a-1-controllers/getUsersForDev");
const logIn_1 = require("./a-1-controllers/logIn");
const createUser_1 = require("./a-1-controllers/createUser");
const getMe_1 = require("./a-1-controllers/getMe");
const findUserByToken_1 = require("../../neko-3-helpers/h-2-users/findUserByToken");
const passwordRecovery_1 = require("./a-1-controllers/passwordRecovery");
const setNewPassword_1 = require("./a-1-controllers/setNewPassword");
const auth = express_1.default.Router();
auth.get('/', getUsersForDev_1.getUsersForDev); // for dev
auth.post('/login', logIn_1.logIn);
auth.post('/register', createUser_1.createUser);
auth.post('/me', findUserByToken_1.findUserByToken(getMe_1.getMe, 'getMe'));
auth.post('/forgot', passwordRecovery_1.passwordRecovery);
auth.post('/set-new-password', setNewPassword_1.setNewPassword);
auth.post('/test', (req, res) => {
    if (req.body.success === true) {
        res.status(200).json({
            errorText: '...всё ок)',
            info: 'код 200 - обычно означает что скорее всего всё ок)',
            yourBody: req.body,
            yourQuery: req.query
        });
    }
    else if (req.body.success !== false) {
        res.status(400).json({
            errorText: 'Ты не отправил success в body вообще!',
            info: 'ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!',
            yourBody: req.body,
            yourQuery: req.query
        });
    }
    else {
        res.status(500).json({
            errorText: 'эмитация ошибки на сервере',
            info: 'ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных)',
            yourBody: req.body,
            yourQuery: req.query
        });
    }
});
exports.default = auth;
//# sourceMappingURL=index.js.map