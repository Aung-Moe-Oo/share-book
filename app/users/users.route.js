"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const verifyToken_1 = require("../middware/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.post("/login", users_controller_1.login);
userRouter.post("/register", users_controller_1.register);
userRouter.patch("/edit/:id", verifyToken_1.VerifyUserToken, users_controller_1.editUserById);
// User Management By Admin
userRouter.get("/", verifyToken_1.VerifyAdminToken, users_controller_1.fetchAllUsers);
userRouter.patch("/update/:id", verifyToken_1.VerifyAdminToken, users_controller_1.updateUserByAdmin);
userRouter.delete("/delete/:id", verifyToken_1.VerifyAdminToken, users_controller_1.deleteUserByAdmin);
exports.default = userRouter;
