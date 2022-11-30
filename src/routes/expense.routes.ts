import express from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
} from "../controllers/expense.controller";
import validateResource from "../middleware/validateResources";
import {
  createExpenseSchema,
  deleteExpenseSchema,
  getExpenseSchema,
  updateExpenseSchema,
} from "../schema/expense.schema";

const router = express.Router();

router.get("/", getExpensesHandler);
router.get("/:id", validateResource(getExpenseSchema), getExpenseHandler);
router.post("/", validateResource(createExpenseSchema), createExpenseHandler);
router.put("/:id", validateResource(updateExpenseSchema), updateExpenseHandler);
router.delete(
  "/:id",
  validateResource(deleteExpenseSchema),
  deleteExpenseHandler
);

export default router;
