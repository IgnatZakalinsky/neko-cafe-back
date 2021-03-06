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
const user_1 = __importDefault(require("../../neko-2-features/f-1-auth/a-2-models/user"));
const v1_1 = __importDefault(require("uuid/v1"));
exports.generateResetPasswordToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const chars = 'ADEFGHJLMNPQRTYabdefghijmnpqrty2345679!@#$%^&*()-+=?.,'; // Il1Oo0CcSsUuVvWwXxZzB8Kk
    //
    // let password = '';
    // for (let i = 0; i < 9; i++) {
    //     password += chars[Math.floor(Math.random() * chars.length)];
    // }
    const resetPasswordToken = v1_1.default();
    yield user_1.default.findByIdAndUpdate(userId, { resetPasswordToken, resetPasswordTokenDeathTime: new Date().getTime() + (1000 * 60 * 10) }, // 10 min
    { new: true }).exec();
    return resetPasswordToken;
});
//# sourceMappingURL=generateResetPasswordToken.js.map