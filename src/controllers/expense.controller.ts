import { Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import {
  createExpenseInput,
  modifyExpenseParams,
  updateExpenseInput,
} from "../schema/expense.schema";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../services/expense.service";

/**
 * @desc get Expenses
 * @route GET /api/expenses
 * @access Private
 */
export async function getExpensesHandler(req: Request, res: Response) {
  const expenses = await getExpenses();
  return res.status(HttpStatusCode.OK).json(expenses);
}

/**
 * @desc get Expense
 * @route GET /api/expense/:id
 * @access Private
 */
export async function getExpenseHandler(
  req: Request<modifyExpenseParams>,
  res: Response
) {
  const params = req.params;
  try {
    const expense = await getExpense(params);
    return res.send(expense);
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc Add new Expense
 * @route POST /api/expenses
 * @access Private
 */
export async function createExpenseHandler(
  req: Request<{}, {}, createExpenseInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createExpense(body);
    return res.send("Expense added successfully");
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc update Expense
 * @route PUT /api/expenses/:id
 * @access Private
 */
export async function updateExpenseHandler(
  req: Request<modifyExpenseParams, {}, updateExpenseInput>,
  res: Response
) {
  const { params, body } = req;
  try {
    const expense = await updateExpense(params, body);
    return res.send({
      message: `Expense: ${params.id} updated successfully`,
      expense,
    });
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

/**
 * @desc delete Expense
 * @route DELETE /api/expenses/:id
 * @access Private
 */
export async function deleteExpenseHandler(
  req: Request<modifyExpenseParams>,
  res: Response
) {
  const params = req.params;
  try {
    const expense = await deleteExpense(params);
    return res.send({
      message: `Expense: ${params.id} successfully deleted`,
      expense,
    });
  } catch (e: any) {
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}
