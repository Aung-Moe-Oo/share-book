import { Router } from "express";
import { login, register } from "./admin.controller";

const adminRouter = Router();

adminRouter.post("/login", login);
adminRouter.post("/register", register);

export default adminRouter;
