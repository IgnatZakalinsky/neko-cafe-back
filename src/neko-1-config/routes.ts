import {Express, Request, Response} from "express";
import auth from "../neko-2-features/f-1-auth";
import users from "../neko-2-features/f-2-users";
import privateChats from "../neko-2-features/f-3-private-chats";
import shop from "../neko-2-features/f-4-shop/index";
import file from "../neko-2-features/f-5-file/index";

export const routes = (app: Express) => {
    // routes
    app.use('/auth', auth);
    // app.use('/users', users);
    // app.use('/private-chats', privateChats);
    //
    // app.use('/shop', shop);
    //
    // app.use('/file', file);

    //test
    app.use((req: Request, res: Response) => {
        console.log('Neko-bad url: ', req.method, req.url);
        res.status(404).json({error: 'bad url test', method: req.method, url: req.url});
    });
    //default
    app.use((req: Request, res: Response) => {
        console.log('Neko-bad url: ', req.method, req.url);
        res.status(404).json({error: 'bad url', method: req.method, url: req.url});
    });
};
