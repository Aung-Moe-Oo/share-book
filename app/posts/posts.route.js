"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middware/verifyToken");
const posts_controller_1 = require("./posts.controller");
const postRouter = (0, express_1.Router)();
postRouter.post("/create", verifyToken_1.VerifyUserToken, posts_controller_1.createPost);
postRouter.get("/", verifyToken_1.VerifyAllToken, posts_controller_1.fetchAllPosts);
postRouter.get("/published", posts_controller_1.fetchPublishedPosts);
postRouter.get("/:id", posts_controller_1.fetchPostById);
postRouter.patch("/edit/:id", verifyToken_1.VerifyUserToken, posts_controller_1.updatePostByUser);
postRouter.patch("/update/:id", verifyToken_1.VerifyAdminToken, posts_controller_1.updatePostByAdmin);
postRouter.delete("/delete/:id", verifyToken_1.VerifyAllToken, posts_controller_1.deletePost);
exports.default = postRouter;
