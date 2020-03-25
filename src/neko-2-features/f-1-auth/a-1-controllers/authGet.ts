import {Request, Response, Router} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";

export const authGet = (path: string, auth: Router) =>

    auth.get(path, async (req: Request, res: Response) => {
        if (DEV_VERSION) {
            try {
                const users: IUser[] = await User.find({isAdmin: false}).exec();

                res.status(200)
                    .json({users, warnings: ['This endpoint will be deleted!!! Just for development!!!']});

            } catch (e) {
                res.status(500).json({error: 'some error', errorObject: e, in: 'authGet/User.find'});
            }
        } else {
            res.status(401).json({error: 'endpoint is closed', in: 'authGet'});
        }
    });
