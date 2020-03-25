import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {emailValidator, passwordValidator} from "../validators";
import {DEV_VERSION} from "../../../neko-1-config/app";
import bCrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    if (!emailValidator(req.body.email)) {
        res.status(400).json({
            error: 'Email not valid!'
                + (DEV_VERSION ? ' /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')' : ''),
            email: req.body.email,
            in: 'createUser'
        });

    } else if (!passwordValidator(req.body.password)) {
        res.status(400).json({
            error: 'Password not valid! must be more than 7 characters...',
            password: req.body.password,
            in: 'createUser'
        });

    } else {
        try {
            const user: IUser = await User.create({
                email: req.body.email,
                password: await bCrypt.hash(req.body.password, 10),
                rememberMe: false,
                isAdmin: false,
                name: req.body.email,
            });

            const addedUser: any = {...user};
            delete addedUser.password; // don't send password to the front
            res.status(201).json({addedUser, success: true});

        } catch (e) {
            res.status(500).json({
                error: 'some error', // 'email may already exist',
                errorObject: DEV_VERSION && e,
                in: 'createUser/User.create'
            });

        }
    }
};
