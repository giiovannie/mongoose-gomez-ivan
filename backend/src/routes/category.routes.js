import { Router } from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { createCategoryValidator, updateCategoryValidator, validationCategoryById } from "../middlewares/validators/categoryValidator.js";
import { validate } from "../middlewares/validate.js";

export const categoryRouter = Router();

categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", validationCategoryById, validate, getCategoryById);
categoryRouter.post("/categories", createCategoryValidator, validate, createCategory);
categoryRouter.put("/categories/:id", updateCategoryValidator, validate, updateCategory);
categoryRouter.delete("/categories/:id", validationCategoryById, validate, deleteCategory);
