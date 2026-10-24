import { Router } from "express";
import { getAllUsers, getUserById, createUsers, updateUsers, deleteUsers } from "../controllers/user.controller.js";
import { createUserValidation, updateUserValidator, validationUserById } from "../middlewares/validators/userValidator.js";
import { validate } from "../middlewares/validate.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", validationUserById, validate, getUserById);
userRouter.post("/users", createUserValidation, validate, createUsers);
userRouter.put("/users/:id", updateUserValidator,validate, updateUsers);
userRouter.delete("/users/:id", validationUserById, validate, deleteUsers);
