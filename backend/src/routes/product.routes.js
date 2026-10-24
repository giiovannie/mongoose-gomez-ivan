
import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { createProductValidator, updateProductValidator, validationProductById } from "./validators/productValidator.js";
import { validate } from "../middlewares/validate.js";

export const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", validationProductById, validate, getProductById);
productRouter.post("/products", createProductValidator, validate, createProduct);
productRouter.put("/products/:id", updateProductValidator, validate, updateProduct);
productRouter.delete("/products/:id", validationProductById, validate, deleteProduct);
