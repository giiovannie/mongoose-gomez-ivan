import { body, param } from "express-validator";
import { categoryModel } from "../../models/Category.js";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener entre 3 y 60 caracteres")
    .custom(async (value) => {
      const category = await categoryModel.findOne({ name: value });
      if (category) throw new Error("La categoría ya existe")
      return true;
    }),
  body("description")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria"),
  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive debe ser booleano"),
];

export const updateCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("El ID de la categoría no es válido"),
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener entre 3 y 60 caracteres")
    .custom(async (value, { req }) => {
      const category = await categoryModel.findOne({
        name: value,
        _id: { $ne: req.params.id },
      });
      if (category) throw new Error("La categoría ya existe");
      return true;
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty().withMessage("La descripción no puede estar vacía"),
  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive debe ser booleano"),
];

export const validationCategoryById = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID de la categoría no es válido")
    .bail()
    .custom(async (id) => {
      const categoryExist = await categoryModel.findById(id);
      if (!categoryExist) throw new Error("La categoría no existe");
      return true;
    }),
];