import express from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
