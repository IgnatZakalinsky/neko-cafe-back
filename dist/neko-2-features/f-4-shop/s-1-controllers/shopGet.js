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
exports.shopGet = (path, shop) => shop.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = +req.query.page || 1;
    const pageCount = +req.query.pageCount || 7;
    // await Product.create({productName: 'fakeProduct', price: 2000}); // seed
    product_1.default.findOne().sort({ price: 1 })
        .exec()
        .then((productMin) => {
        const min = productMin ? productMin.price : 1000;
        product_1.default.findOne().sort({ price: -1 }).exec()
            .then((productMax) => {
            const max = productMax ? productMax.price : min;
            const sortName = req.query.sortProducts && req.query.sortProducts.length > 2
                ? req.query.sortProducts.slice(1) : undefined;
            const direction = sortName ? (req.query.sortProducts[0] === '0' ? -1 : 1) : undefined;
            product_1.default.find({
                productName: new RegExp(req.query.productName),
                price: { $gte: req.query.min || min, $lte: req.query.max || max }
            })
                .sort({ [sortName]: direction, updated: -1 })
                .skip(pageCount * (page - 1))
                .limit(pageCount)
                .lean()
                .exec()
                .then(products => {
                product_1.default.count({
                    productName: new RegExp(req.query.productName),
                    price: { $gte: req.query.min || min, $lte: req.query.max || max }
                })
                    .exec()
                    .then(productTotalCount => {
                    if (pageCount * (page - 1) > productTotalCount)
                        page = 1;
                    res.status(200)
                        .json({
                        products: products.map(p => (Object.assign(Object.assign({}, p), { id: p._id }))),
                        page, pageCount, productTotalCount,
                        minPrice: min, maxPrice: max,
                    });
                })
                    .catch(e => res.status(500)
                    .json({ error: 'some error', errorObject: e, in: 'shopGet/Product.count' }));
            })
                .catch(e => res.status(500)
                .json({ error: 'some error', errorObject: e, in: 'shopGet/Product.find' }));
        })
            .catch(e => res.status(500)
            .json({ error: 'some error', errorObject: e, in: 'shopGet/Product.findOne/max' }));
    })
        .catch(e => res.status(500)
        .json({ error: 'some error', errorObject: e, in: 'shopGet/Product.findOne/min' }));
}));
// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.
// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.
// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.
// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.
//# sourceMappingURL=shopGet.js.map