import {Request, Response, Router} from "express";
import User, {IUser} from "../a-2-models/user";
import uuidv1 from "uuid/v1";

export const authLoginPost = (path: string, auth: Router) =>

    auth.post('/login', async (req: Request, res: Response) => {
        User.findOne({email: req.body.email})
            .exec()
            .then((user: IUser | null) => {
                if (!user || user.password !== req.body.password) // will be added bCrypt
                    res.status(400).json({error: 'not correct email/password'});

                else {
                    const token = uuidv1();
                    const tokenDeathTime = req.body.rememberMe
                        ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 days
                        : new Date().getTime() + (1000 * 60 * 60 * 3); // 3 hours

                    User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime, rememberMe: req.body.rememberMe},
                        {new: true})
                        .exec()
                        .then((newUser: IUser | null) => {
                            if (!newUser) res.status(500).json({error: 'not updated?', in: 'authLoginPost'});

                            else {
                                console.log('IUser?: ', {...newUser}); // for dev
                                res.cookie('token', token, {maxAge: tokenDeathTime});
                                res.status(200).json({...newUser._doc}); // _doc!!!
                            }
                        })
                        .catch(e => res.status(500)
                            .json(
                                {error: 'some error', errorObject: e, in: 'authLoginPost/User.findByIdAndUpdate'}
                            ))
                }
            })
            .catch(e => res.status(500).json(
                {error: 'some error', errorObject: e, in: 'authLoginPost/User.findOne'}
            ));
    });

// const pass = "somePass";
// const hashPass = await bCrypt.hash(pass, 10);
// console.log(await bCrypt.compare(pass, hashPass));
// console.log(await bCrypt.compare(pass + '2', hashPass));
//
// res.cookie('testCookie', 'test', {maxAge: 60000 * 3}); // 3 min
// res.status(200).json({answer: 'test'});
