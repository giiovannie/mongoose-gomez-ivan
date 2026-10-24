import { body, param } from "express-validator";
import { UserModel } from "../../models/User.js";
import { RoleModel } from "../../models/Role.js";
import { productModel } from "../../models/Product.js";

export const createUserValidation = [
  body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isString().withMessage("el username debe ser del tipo string")
    .isLength({ min: 6, max: 15 }).withMessage("el username no cumple con los caracteres requeridos"),
  body("email")
    .notEmpty().withMessage("el email no debe de estar vacio")
    .isEmail().withMessage("el email no esta en el formato valido(email)")
    .bail()
    .custom(async (email) => {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) throw new Error("el email ya existe y esta en uso");
      return true;
    }),
  body("password")
    .notEmpty().withMessage("la contraseña debe ser obligatoria")
    .isString().withMessage("el campo de la contraseña debe de ser del tipo string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
    ).withMessage(
      "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    ),
  body("roles.*")
    .notEmpty().withMessage("el rol deber ser obligatorio")
    .isMongoId().withMessage("el rol debe ser del tipo string")
    .bail()
    .custom(async (rolID) => {
      const roleExist = await RoleModel.findOne({_id: rolID, isActive:true});
      if (!roleExist)
        throw new Error("el rol no que estas tratando de insertar no existe");
      return true;
    }),
  body("favorites")
    .optional()
    .isArray().withMessage("Los favoritos deben enviarse como un array"),
  body("favorites.*")
    .optional()
    .isMongoId().withMessage("El ID del producto favorito no es válido")
    .bail()
    .custom(async (idfavorite) => {
      const product = await productModel.findOne({_id:idfavorite, isActive:true});
      if (!product) throw new Error("El producto favorito no existe");
      return true;
    }),
];

export const updateUserValidator = [
  body("username")
    .optional()
    .notEmpty().withMessage("El nombre de usuario no puede estar vacío")
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username, isActive: true });
      if (user) throw new Error("El nombre de usuario ya existe");
      return true;
    }),
  body("email")
    .optional()
    .isEmail().withMessage("Debe ingresar un email válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email, isActive: true });
      if (user) throw new Error("El email ya está registrado");
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("roles")
    .optional()
    .isArray().withMessage("Los roles deben enviarse en un arreglo")
    .custom(async (roles) => {
      for (const rolID of roles) {
        const rol = await RoleModel.findOne({ _id: rolID, isActive: true });
        if (!rol) throw new Error("Uno de los roles no existe o está inactivo");
      }
    return true;
    }),
  body("favorites")
    .optional()
    .isArray().withMessage("Los favoritos deben enviarse en un arreglo")
    .custom(async (favorites) => {
      for (const idfavorite of favorites) {
        const product = await productModel.findOne({ _id: idfavorite, isActive: true });
        if (!product) throw new Error("Uno de los productos favoritos no existe o está inactivo");
      }
      return true;
    })
];

export const validationUserById = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID del usuario no es válido")
    .bail()
    .custom(async (id) => {
      const userExist = await UserModel.findOne({_id:id, isActive:true});
      if (!userExist) throw new Error("El usuario no existe");
      return true;
    })
];