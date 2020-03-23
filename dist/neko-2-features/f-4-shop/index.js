"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shopGet_1 = require("./s-1-controllers/shopGet");
const shopPost_1 = require("./s-1-controllers/shopPost");
const shopPut_1 = require("./s-1-controllers/shopPut");
const shopDelete_1 = require("./s-1-controllers/shopDelete");
const shopBuyPost_1 = require("./s-1-controllers/shopBuyPost");
const shopRatingPut_1 = require("./s-1-controllers/shopRatingPut");
const shop = express_1.default.Router();
shopGet_1.shopGet('/', shop);
shopPost_1.shopPost('/', shop);
shopPut_1.shopPut('/', shop);
shopDelete_1.shopDelete('/', shop);
shopBuyPost_1.shopBuyPost('/buy', shop);
shopRatingPut_1.shopRatingPut('/rating', shop);
exports.default = shop;
//# sourceMappingURL=index.js.map