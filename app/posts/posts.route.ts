import { Router } from "express";
import {
  VerifyAdminToken,
  VerifyAllToken,
  VerifyUserToken,
} from "../middware/verifyToken";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPostById,
  fetchPublishedPosts,
  updatePostByAdmin,
  updatePostByUser,
} from "./posts.controller";

const postRouter = Router();

postRouter.post("/create", VerifyUserToken, createPost);
postRouter.get("/", VerifyAllToken, fetchAllPosts);
postRouter.get("/published", fetchPublishedPosts);
postRouter.get("/:id", fetchPostById);
postRouter.patch("/edit/:id", VerifyUserToken, updatePostByUser);
postRouter.patch("/update/:id", VerifyAdminToken, updatePostByAdmin);
postRouter.delete("/delete/:id", VerifyAllToken, deletePost);

export default postRouter;
