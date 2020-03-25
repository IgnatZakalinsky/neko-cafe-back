import express from "express";
import {getUsersForDev} from "./a-1-controllers/authGet";
import {logIn} from "./a-1-controllers/authLoginPost";
import {createUser} from "./a-1-controllers/authRegisterPost";
import {authForgotPost} from "./a-1-controllers/authForgotPost";
import {authMePost} from "./a-1-controllers/authMePost";

const auth = express.Router();

auth.get('/', getUsersForDev); // for dev

auth.post('/login', logIn);
auth.post('/register', createUser);
// authForgotPost('/forgot', auth);
// authMePost('/me', auth);

export default auth;
