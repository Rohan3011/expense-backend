import express from "express";
import {
  createBalanceHandler,
  deleteBalanceHandler,
  getBalanceHandler,
  updateBalanceHandler,
} from "../controllers/balance.controller";
import validateResource from "../middleware/validateResources";
import {
  createBalanceSchema,
  updateBalanceSchema,
} from "../schema/balance.schema";

const router = express.Router();

router.get("/", getBalanceHandler);
router.post("/", validateResource(createBalanceSchema), createBalanceHandler);
router.put("/:id", validateResource(updateBalanceSchema), updateBalanceHandler);
router.delete("/:id", deleteBalanceHandler);

export default router;
