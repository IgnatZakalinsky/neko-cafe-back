import express from 'express';
import mongoose from 'mongoose';
import {config} from "./neko-1-config";

const {MongoDBUris, appUse, routes} = config;

const app = express();

appUse(app);
routes(app);

mongoose.connect(MongoDBUris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log('Neko-MongoDB connected successfully');

        //start
        app.listen(process.env.PORT, () => {
            console.log('Neko-back listening on port: ' + process.env.PORT);
        });
        console.log('Neko-start...');
    })
    .catch(e => console.log('Neko-MongoDB connection error: ' + e));

process.on('unhandledRejection', (reason, p) => {
    console.log('Neko-unhandledRejection: ', reason, p);
});
