import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
} from "./categories.controller";
import { VerifyAllToken, VerifyUserToken } from "../middware/verifyToken";

const categoryRouter = Router();

categoryRouter.post("/create", VerifyUserToken, createCategory);
categoryRouter.get("/", fetchAllCategories);
categoryRouter.get("/:id", fetchCategoryById);
categoryRouter.patch("/update/:id", VerifyAllToken, updateCategory);
categoryRouter.delete("/delete/:id", VerifyAllToken, deleteCategory);

export default categoryRouter;
