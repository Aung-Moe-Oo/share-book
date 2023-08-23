import { Router } from "express";
import {
  deleteUserByAdmin,
  editUserById,
  fetchAllUsers,
  login,
  register,
  updateUserByAdmin,
} from "./users.controller";
import { VerifyAdminToken, VerifyUserToken } from "../middware/verifyToken";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.patch("/edit/:id", VerifyUserToken, editUserById);

// User Management By Admin
userRouter.get("/", VerifyAdminToken, fetchAllUsers);
userRouter.patch("/update/:id", VerifyAdminToken, updateUserByAdmin);
userRouter.delete("/delete/:id", VerifyAdminToken, deleteUserByAdmin);

export default userRouter;
