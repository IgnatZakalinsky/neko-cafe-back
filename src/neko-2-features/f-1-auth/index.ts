import express, {Request, Response} from "express";
import {getUsersForDev} from "./a-1-controllers/getUsersForDev";
import {logIn} from "./a-1-controllers/logIn";
import {createUser} from "./a-1-controllers/createUser";
import {getMe} from "./a-1-controllers/getMe";
import {findUserByToken} from "../../neko-3-helpers/h-2-users/findUserByToken";
import {passwordRecovery} from "./a-1-controllers/passwordRecovery";
import {setNewPassword} from "./a-1-controllers/setNewPassword";

const auth = express.Router();

auth.get('/', getUsersForDev); // for dev

auth.post('/login', logIn);
auth.post('/register', createUser);
auth.post('/me', findUserByToken(getMe, 'getMe'));
auth.post('/forgot', passwordRecovery);
auth.post('/set-new-password', setNewPassword);

auth.post('/test', (req: Request, res: Response) => {
    if (req.body.success) {
        res.status(200).json({
            errorText: '...всё ок)',
            info: 'код 200 - обычно означает что скорее всего всё ок)',
            yourBody: req.body,
            yourQuery: req.query
        })
    } else if (req.body.success === undefined) {
        res.status(400).json({
            errorText: 'Ты не отправил success в body вообще!',
            info: 'ошибка 400 - обычно означает что скорее всего фронт отправил что-то не то на бэк!',
            yourBody: req.body,
            yourQuery: req.query
        })
    } else {
        res.status(500).json({
            errorText: 'эмитация ошибки на сервере',
            info: 'ошибка 500 - обычно означает что что-то сломалось на сервере, например база данных)',
            yourBody: req.body,
            yourQuery: req.query
        })
    }
});

export default auth;
