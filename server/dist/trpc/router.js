"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const _1 = require(".");
const router_1 = require("../api/user/router");
exports.appRouter = (0, _1.router)({
    user: router_1.userRouter,
});
