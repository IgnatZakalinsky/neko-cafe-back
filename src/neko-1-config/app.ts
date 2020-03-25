const USER_NAME = process.env.MONGO_DB_USER_NAME || 'ai73aaa';
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || '1qazxcvBG';

export const MongoDBUris =
    `mongodb+srv://${USER_NAME}:${PASSWORD}@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority`; // bd for tests

export const DEV_VERSION = true;
