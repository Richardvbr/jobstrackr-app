"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const user_1 = require("../api/user");
const index_1 = require("./index");
exports.appRouter = (0, index_1.router)({
    user: user_1.userRouter,
});
