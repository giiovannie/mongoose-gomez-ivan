import { body, param } from "express-validator";
import { ProfileModel } from "../../models/Profile.js";
import { UserModel } from "../../models/User.js";

export const createProfileValidator = [
  body("firstName")
    .notEmpty().withMessage("El nombre es obligatorio"),
  body("lastName") 
    .notEmpty().withMessage("El apellido es obligatorio"),
  body("birthdate")
    .notEmpty().withMessage("La fecha de nacimiento es obligatoria")
    .isISO8601().withMessage("La fecha de nacimiento no es válida"),
  body("phone")
    .notEmpty().withMessage("El teléfono es obligatorio"),
  body("addresses")
    .isArray({ min: 1 }).withMessage("Debe proporcionar al menos un domicilio"),
  body("addresses.*.street")
    .notEmpty().withMessage("La calle es obligatoria"),
  body("addresses.*.city")
    .notEmpty().withMessage("La ciudad es obligatoria"),
  body("addresses.*.country")
    .notEmpty().withMessage("El país es obligatorio"),
  body("user")
    .isMongoId().withMessage("El ID del usuario no es válido")
    .bail()
    .custom(async (userID) => {
      const userExist = await UserModel.findById(userID);
      if (!userExist) throw new Error("El usuario indicado no existe");
      const profile = await ProfileModel.findOne({ user: userID });
      if (profile) throw new Error("El usuario ya tiene un perfil")
      return true;
    }),
];

export const updateProfileValidator = [
  param("id")
    .isMongoId().withMessage("El ID del perfil no es válido"),
  body("firstName")
    .optional()
    .notEmpty().withMessage("El nombre no puede estar vacío"),
  body("lastName")
    .optional()
    .notEmpty().withMessage("El apellido no puede estar vacío"),
  body("birthdate")
    .optional()
    .isISO8601().withMessage("La fecha de nacimiento no es válida"),
  body("phone")
    .optional()
    .notEmpty().withMessage("El teléfono no puede estar vacío"),
  body("addresses")
    .optional()
    .isArray({ min: 1 }).withMessage("Debe proporcionar al menos un domicilio"),
  body("addresses.*.street")
    .optional()
    .notEmpty().withMessage("La calle es obligatoria"),
  body("addresses.*.city")
    .optional()
    .notEmpty().withMessage("La ciudad es obligatoria"),
  body("addresses.*.country")
    .optional()
    .notEmpty().withMessage("El país es obligatorio"),
  body("user")
    .optional()
    .isMongoId()
    .withMessage("El ID del usuario no es válido")
    .bail()
    .custom(async (value, { req }) => {
      const user = await UserModel.findById(value);
      if (!user) throw new Error("El usuario indicado no existe");
      const profile = await ProfileModel.findOne({
        user: value,
        _id: { $ne: req.params.id },
      });
      if (profile)
        throw new Error("El usuario ya tiene un perfil");
      return true;
    }),
];

export const validationProfileById = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID del perfil no es válido")
    .bail()
    .custom(async (id) => {
      const profileExist = await ProfileModel.findById(id);
      if (!profileExist) throw new Error("El perfil no existe");
      return true;
    }),
];