"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGet_1 = require("./a-1-controllers/authGet");
const authLoginPost_1 = require("./a-1-controllers/authLoginPost");
const authRegisterPost_1 = require("./a-1-controllers/authRegisterPost");
const authMePost_1 = require("./a-1-controllers/authMePost");
const findUserByToken_1 = require("../../neko-3-helpers/h-2-users/findUserByToken");
const authForgotPost_1 = require("./a-1-controllers/authForgotPost");
const auth = express_1.default.Router();
auth.get('/', authGet_1.getUsersForDev); // for dev
auth.post('/login', authLoginPost_1.logIn);
auth.post('/register', authRegisterPost_1.createUser);
auth.post('/me', findUserByToken_1.findUserByToken(authMePost_1.getMe, 'getMe'));
auth.post('/forgot', authForgotPost_1.generateNewPassword);
exports.default = auth;
//# sourceMappingURL=index.js.map