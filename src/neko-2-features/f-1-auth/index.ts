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

auth.get('/test', (req: Request, res: Response) => {
    if (req.body.success) {

    } else if (req.body.success === undefined) {
        res.status(500).json({
            errorText: 'Ты не отправил success в body вообще!'
        })
    } else {

    }
});

export default auth;
