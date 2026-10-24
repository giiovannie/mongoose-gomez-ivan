import { Router } from "express";
import { getAllProfiles, getProfilesbyId, createProfile, updateProfile, deleteProfile } from "../controllers/profile.controller.js";
import { createProfileValidator, updateProfileValidator, validationProfileById } from "./validators/profileValidator.js";
import { validate } from "../middlewares/validate.js";

export const profileRouter = Router();

profileRouter.get("/profiles", getAllProfiles);
profileRouter.get("/profiles/:id", validationProfileById, validate, getProfilesbyId);
profileRouter.post("/profiles", createProfileValidator, validate, createProfile);
profileRouter.put("/profiles/:id", updateProfileValidator, validate, updateProfile);
profileRouter.delete("/profiles/:id", validationProfileById, validate, deleteProfile);
