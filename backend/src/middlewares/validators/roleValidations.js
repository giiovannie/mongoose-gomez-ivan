import { body, param } from "express-validator";
import { RoleModel } from "../../models/Role.js";

export const createRoleValidator = [
  body("rolename")
    .notEmpty().withMessage("El nombre del rol es obligatorio")
    .bail()
    .custom(async (name) => {
      const role = await RoleModel.findOne({ rolename: name, isActive:true});
      if (role) throw new Error("El rol ya existe");
      return true;
    }),
];

export const updateRoleValidator = [
  param("id")
    .isMongoId().withMessage("El ID del rol no es válido"),
  body("rolename")
    .optional()
    .notEmpty().withMessage("El nombre del rol no puede estar vacío")
    .bail()
    .custom(async (name, { req }) => {
      const role = await RoleModel.findOne({
        rolename: name,
        _id: { $ne: req.params.id },
        isActive:true
      });
      if (role) throw new Error("El rol ya existe");
      return true;
    }),
];


export const validationRoleById = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID del rol no es válido")
    .bail()
    .custom(async (id) => {
      const roleExist = await RoleModel.findOne({_id:id, isActive:true});
      if (!roleExist) throw new Error("El rol no existe");
      return true;
    }),
];