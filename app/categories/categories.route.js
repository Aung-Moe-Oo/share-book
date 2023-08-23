"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("./categories.controller");
const verifyToken_1 = require("../middware/verifyToken");
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("/create", verifyToken_1.VerifyUserToken, categories_controller_1.createCategory);
categoryRouter.get("/", categories_controller_1.fetchAllCategories);
categoryRouter.get("/:id", categories_controller_1.fetchCategoryById);
categoryRouter.patch("/update/:id", verifyToken_1.VerifyAllToken, categories_controller_1.updateCategory);
categoryRouter.delete("/delete/:id", verifyToken_1.VerifyAllToken, categories_controller_1.deleteCategory);
exports.default = categoryRouter;
