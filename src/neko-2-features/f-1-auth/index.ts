import express from "express";
import {getUsersForDev} from "./a-1-controllers/authGet";
import {logIn} from "./a-1-controllers/authLoginPost";
import {createUser} from "./a-1-controllers/authRegisterPost";
import {getMe} from "./a-1-controllers/authMePost";
import {findUserByToken} from "./findUserByToken";
import {generateNewPassword} from "./a-1-controllers/authForgotPost";

const auth = express.Router();

auth.get('/', getUsersForDev); // for dev

auth.post('/login', logIn);
auth.post('/register', createUser);
auth.post('/me', findUserByToken(getMe, 'getMe'));
auth.post('/forgot', generateNewPassword);

export default auth;
