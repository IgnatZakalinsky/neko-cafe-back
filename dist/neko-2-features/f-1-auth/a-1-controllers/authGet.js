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
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authGet = (path, auth) => auth.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User.find({isAdmin: false})
    //     .exec()
    //     .then(users =>
    //         res.status(200)
    //             .json({users, warnings: ['This endpoint will be deleted!!! Just for development!!!']}))
    //
    //     .catch(e => res.status(500)
    //         .json({error: 'some error', errorObject: e, in: 'authGet/User.find'}));
    const pass = "somePass";
    const hashPass = yield bcrypt_1.default.hash(pass, 10);
    console.log(yield bcrypt_1.default.compare(pass, hashPass));
    console.log(yield bcrypt_1.default.compare(pass + '2', hashPass));
    res.cookie('testCookie', 'test', { maxAge: 60000 * 3 }); // 3 min
    res.status(200).json({ answer: 'test' });
}));
//# sourceMappingURL=authGet.js.map