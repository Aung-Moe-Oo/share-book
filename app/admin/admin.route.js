"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/login", admin_controller_1.login);
adminRouter.post("/register", admin_controller_1.register);
exports.default = adminRouter;
