"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// routes
const users_route_1 = __importDefault(require("./users/users.route"));
const admin_route_1 = __importDefault(require("./admin/admin.route"));
const categories_route_1 = __importDefault(require("./categories/categories.route"));
const posts_route_1 = __importDefault(require("./posts/posts.route"));
const appRouter = (0, express_1.Router)();
appRouter.get("/", (req, res) => {
    res.send("Hello World.");
});
appRouter.use("/api/admin", admin_route_1.default);
appRouter.use("/api/user", users_route_1.default);
appRouter.use("/api/category", categories_route_1.default);
appRouter.use("/api/post", posts_route_1.default);
exports.default = appRouter;
