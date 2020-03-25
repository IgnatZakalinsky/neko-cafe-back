"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGet_1 = require("./a-1-controllers/authGet");
const authLoginPost_1 = require("./a-1-controllers/authLoginPost");
const auth = express_1.default.Router();
auth.get('/', authGet_1.getUsersForDev); // for dev
auth.post('/login', authLoginPost_1.logIn);
// authRegisterPost('/register', auth);
// authForgotPost('/forgot', auth);
// authMePost('/me', auth);
exports.default = auth;
//# sourceMappingURL=index.js.map