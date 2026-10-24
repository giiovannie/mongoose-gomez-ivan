import { body, param } from "express-validator";
import { categoryModel } from "../../models/Category.js";
import {productModel} from "../../models/Product.js"
 
export const createProductValidator = [
  body("name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 5, max: 60 }).withMessage("El nombre debe tener entre 5 y 60 caracteres"),
  body("description")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({ min: 50, max: 366 }).withMessage("La descripción debe tener entre 50 y 366 caracteres"),
  body("price")
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),
  body("stock")
    .isInt({ min: 0 }).withMessage("El stock debe ser un entero no negativo"),
  body("categories")
    .isArray({ min: 1 }).withMessage("El producto debe tener al menos una categoría"),
  body("categories.*")
    .isMongoId().withMessage("El ID de la categoría no es válido")
    .bail()
    .custom(async (category_id) => {
      const category = await categoryModel.findOne({_id:category_id, isActive:true});
      if (!category) throw new Error("La categoría indicada no existe");
      return true;
    }),
  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive debe ser booleano"),
];

export const updateProductValidator = [
  param("id")
    .isMongoId().withMessage("El ID del producto no es válido"),
  body("name")
    .optional()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ min: 5, max: 60 }).withMessage("El nombre debe tener entre 5 y 60 caracteres"),
  body("description")
    .optional()
    .notEmpty().withMessage("La descripción no puede estar vacía")
    .isLength({ min: 50, max: 366 }).withMessage("La descripción debe tener entre 50 y 366 caracteres"),
  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un entero no negativo"),
  body("categories")
    .optional()
    .isArray({ min: 1 }).withMessage("El producto debe tener al menos una categoría"),
  body("categories.*")
    .optional()
    .isMongoId()
    .withMessage("El ID de la categoría no es válido")
    .bail()
    .custom(async (category_id) => {
      const category = await categoryModel.findOne({_id:category_id, isActive:true});
      if (!category) throw new Error("La categoría indicada no existe");
      return true;
    }),
  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive debe ser booleano"),
];

export const validationProductById = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID del producto no es válido")
    .bail()
    .custom(async (id) => {
      const productExist = await productModel.findOne({_id:id, isActive:true});
      if (!productExist) throw new Error("El producto no existe");
      return true;
    }),
];