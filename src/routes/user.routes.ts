import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.get("/me", requireUser, getCurrentUserHandler);
router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
