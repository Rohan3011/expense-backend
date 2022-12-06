import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";
import validateResource from "../middleware/validateResources";
import { createSessionSchema } from "../schema/auth.schema";

const router = express.Router();

router.post("/", validateResource(createSessionSchema), createSessionHandler);
router.post("/refresh", refreshAccessTokenHandler);

export default router;
