"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USER_NAME = process.env.MONGO_DB_USER_NAME || 'ai73aaa';
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || '1qazxcvBG';
exports.MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority`;
exports.DEV_VERSION = true;
//# sourceMappingURL=app.js.map