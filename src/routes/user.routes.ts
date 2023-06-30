import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.get("/me", requireUser, getCurrentUserHandler);
router.put("/onboarding", requireUser, updateUserHandler);
router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
