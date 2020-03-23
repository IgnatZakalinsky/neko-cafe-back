"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGet_1 = require("./a-1-controllers/authGet");
const auth = express_1.default.Router();
authGet_1.authGet('/', auth); // for dev
// authLoginPost('/login', auth);
// authRegisterPost('/register', auth);
// authForgotPost('/forgot', auth);
// authMePost('/me', auth);
exports.default = auth;
//# sourceMappingURL=index.js.map