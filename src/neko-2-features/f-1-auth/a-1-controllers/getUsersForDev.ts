import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../neko-1-config/app";

export const getUsersForDev = async (req: Request, res: Response) => {
    if (DEV_VERSION) {
        try {
            const users = await User.find({isAdmin: false})
                .select('_id email rememberMe isAdmin name token tokenDeathTime created updated')
                .exec();

            res.status(200)
                .json({users, warnings: 'This endpoint will be deleted!!! Just for development!!!'});

        } catch (e) {
            res.status(500).json({error: 'some error', errorObject: e, in: 'getUsersForDev/User.find'});

        }
    } else {
        res.status(401).json({error: 'endpoint is closed', in: 'getUsersForDev'});

    }
};
