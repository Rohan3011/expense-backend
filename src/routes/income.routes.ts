import express from "express";
import {
  createIncomeHandler,
  deleteIncomeHandler,
  getIncomeHandler,
  getIncomesHandler,
  updateIncomeHandler,
} from "../controllers/income.controller";
import validateResource from "../middleware/validateResources";
import {
  createIncomeSchema,
  deleteIncomeSchema,
  getIncomeSchema,
  updateIncomeSchema,
} from "../schema/income.schema";

const router = express.Router();

router.get("/", getIncomesHandler);
router.get("/:id", validateResource(getIncomeSchema), getIncomeHandler);
router.post("/", validateResource(createIncomeSchema), createIncomeHandler);
router.put("/:id", validateResource(updateIncomeSchema), updateIncomeHandler);
router.delete(
  "/:id",
  validateResource(deleteIncomeSchema),
  deleteIncomeHandler
);

export default router;
