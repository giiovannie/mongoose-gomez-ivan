import { Router } from "express";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller.js";
import { createRoleValidator, updateRoleValidator, validationRoleById } from "../middlewares/validators/roleValidations.js";
import { validate } from "../middlewares/validate.js";

export const roleRouter = Router();

roleRouter.get("/roles", getAllRoles);
roleRouter.get("/roles/:id", validationRoleById, validate, getRoleById);
roleRouter.post("/roles", createRoleValidator, validate, createRole);
roleRouter.put("/roles/:id", updateRoleValidator, validate, updateRole);
roleRouter.delete("/roles/:id", validationRoleById, validate, deleteRole);
