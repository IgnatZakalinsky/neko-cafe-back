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
const product_1 = __importDefault(require("../s-2-models/product"));
exports.shopPut = (path, shop) => shop.put(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.product)
        res.status(400).json({ error: `No product in body!` });
    else if (!req.body.product.productName || (req.body.product.productName + '').length < 6)
        res.status(400)
            .json({
            error: `Product name [${req.body.product.productName}] not valid! must be more than 5 characters...`,
            productName: req.body.product.productName
        });
    else if (!Number(req.body.product.price) || Number(req.body.product.price) <= 0)
        res.status(400)
            .json({
            error: `Product price [${req.body.product.price}] not valid! must be more than 0...`,
            price: req.body.product.price
        });
    else if (!req.body.product.id)
        res.status(400).json({ error: `No product id`, id: req.body.product.id });
    else
        product_1.default.findByIdAndUpdate(req.body.product.id, {
            productName: req.body.product.productName,
            price: +req.body.product.price,
            productType: req.body.product.productType
        }, { new: true })
            .exec()
            .then((product) => {
            if (!product)
                res.status(400)
                    .json({ error: `Product id not valid`, id: req.body.product.id });
            else
                res.status(200).json({ updatedProduct: product, success: true });
        })
            .catch(e => res.status(400)
            .json({ error: 'some error', errorObject: e, in: 'shopPut/Product.findByIdAndUpdate' }));
}));
//# sourceMappingURL=shopPut.js.map