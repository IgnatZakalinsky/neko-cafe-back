"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const f_1_auth_1 = __importDefault(require("../neko-2-features/f-1-auth"));
exports.routes = (app) => {
    // routes
    app.use('/auth', f_1_auth_1.default);
    // app.use('/users', users);
    // app.use('/private-chats', privateChats);
    //
    // app.use('/shop', shop);
    //
    // app.use('/file', file);
    //test
    app.use((req, res) => {
        console.log('Neko-bad url: ', req.method, req.url);
        res.status(404).json({ error: 'bad url test', method: req.method, url: req.url });
    });
    //default
    // app.use((req: Request, res: Response) => {
    //     console.log('Neko-bad url: ', req.method, req.url);
    //     res.status(404).json({error: 'bad url', method: req.method, url: req.url});
    // });
};
//# sourceMappingURL=routes.js.map