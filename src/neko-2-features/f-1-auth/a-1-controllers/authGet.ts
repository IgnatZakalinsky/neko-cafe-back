import {Request, Response, Router} from "express";
import User from "../a-2-models/user";

export const authGet = (path: string, auth: Router) =>

    auth.get(path, async (req: Request, res: Response) => {
        // User.find({isAdmin: false})
        //     .exec()
        //     .then(users =>
        //         res.status(200)
        //             .json({users, warnings: ['This endpoint will be deleted!!! Just for development!!!']}))
        //
        //     .catch(e => res.status(500)
        //         .json({error: 'some error', errorObject: e, in: 'authGet/User.find'}));
        res.cookie('testCookie', 'test', {maxAge: 60000 * 3}); // 3 min

        res.status(200).json({answer: 'test'});
    });
