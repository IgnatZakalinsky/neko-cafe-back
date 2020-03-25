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
exports.getUsersForDev = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (app_1.DEV_VERSION) {
        try {
            const users = yield user_1.default.find({ isAdmin: false }).exec();
            res.status(200)
                .json({ users, warnings: 'This endpoint will be deleted!!! Just for development!!!' });
        }
        catch (e) {
            res.status(500).json({ error: 'some error', errorObject: e, in: 'getUsersForDev/User.find' });
        }
    }
    else {
        res.status(401).json({ error: 'endpoint is closed', in: 'getUsersForDev' });
    }
});
//# sourceMappingURL=authGet.js.map